"""AR SmartFarm AI FastAPI service.

ML endpoints deliberately return a clear unavailable response until a model
artifact has been produced by the training pipeline.
"""
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

APP_DIR = Path(__file__).resolve().parent
MODEL_DIR = APP_DIR.parent / "models"
CROP_MODEL = MODEL_DIR / "crop_model.joblib"

app = FastAPI(title="AR SmartFarm AI", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class CropRequest(BaseModel):
    nitrogen: float = Field(ge=0, le=200)
    phosphorus: float = Field(ge=0, le=200)
    potassium: float = Field(ge=0, le=250)
    temperature: float = Field(ge=-10, le=60)
    humidity: float = Field(ge=0, le=100)
    ph: float = Field(ge=0, le=14)
    rainfall: float = Field(ge=0, le=5000)


class IrrigationRequest(BaseModel):
    soil_moisture: float = Field(ge=0, le=100)
    temperature: float = Field(ge=-10, le=60)
    humidity: float = Field(ge=0, le=100)
    rainfall_forecast: float = Field(ge=0, le=500)
    crop_stage: str = Field(min_length=1, max_length=40)
    crop: str = Field(min_length=1, max_length=40)


class DiseaseResponse(BaseModel):
    status: Literal["Model not trained"]
    message: str


@app.get("/api/health")
def health() -> dict[str, str | bool]:
    return {
        "status": "healthy",
        "service": "AR SmartFarm AI FastAPI",
        "crop_model_available": CROP_MODEL.exists(),
    }


@app.post("/api/crop/recommend")
def recommend_crop(payload: CropRequest) -> dict:
    if not CROP_MODEL.exists():
        raise HTTPException(
            status_code=503,
            detail={
                "code": "MODEL_NOT_TRAINED",
                "message": "Crop recommendation model is not trained. Run the training pipeline first.",
            },
        )

    import joblib

    model = joblib.load(CROP_MODEL)
    values = [[
        payload.nitrogen,
        payload.phosphorus,
        payload.potassium,
        payload.temperature,
        payload.humidity,
        payload.ph,
        payload.rainfall,
    ]]
    probabilities = model.predict_proba(values)[0]
    classes = model.classes_
    ranked = sorted(zip(classes, probabilities), key=lambda item: item[1], reverse=True)
    return {
        "recommended_crop": ranked[0][0],
        "confidence": round(float(ranked[0][1]) * 100, 2),
        "top_3": [{"crop": crop, "confidence": round(float(score) * 100, 2)} for crop, score in ranked[:3]],
        "model_version": "crop-rf-v1",
    }


@app.post("/api/irrigation/predict")
def predict_irrigation(payload: IrrigationRequest) -> dict:
    rain_expected = payload.rainfall_forecast >= 20
    if rain_expected or payload.soil_moisture >= 70:
        return {
            "irrigation_required": False,
            "urgency": "low",
            "water_quantity_mm": 0,
            "reason": "Rain is expected or soil moisture is already sufficient.",
            "next_check_hours": 12,
            "manual_confirmation_required": True,
        }
    urgency = "high" if payload.soil_moisture < 25 else "medium"
    quantity = 25 if payload.temperature >= 35 else 15
    return {
        "irrigation_required": True,
        "urgency": urgency,
        "water_quantity_mm": quantity,
        "reason": "Soil moisture is below the configured agronomic threshold.",
        "next_check_hours": 6 if urgency == "high" else 12,
        "manual_confirmation_required": True,
    }


@app.post("/api/disease/predict", response_model=DiseaseResponse)
def predict_disease() -> DiseaseResponse:
    return DiseaseResponse(
        status="Model not trained",
        message="No validated disease image model is available. Upload inference is disabled until training is complete.",
    )


@app.get("/api/schemes")
def schemes() -> dict:
    return {
        "demo": True,
        "schemes": [
            {"name": "PM-KISAN", "official_url": "https://pmkisan.gov.in"},
            {"name": "Pradhan Mantri Fasal Bima Yojana", "official_url": "https://pmfby.gov.in"},
            {"name": "Soil Health Card", "official_url": "https://soilhealth.dac.gov.in"},
            {"name": "e-NAM", "official_url": "https://enam.gov.in"},
        ],
    }
