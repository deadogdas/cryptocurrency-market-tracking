from fastapi import APIRouter

from src.init import cmc_client

router = APIRouter(
    prefix="/crypto_currencies",
)

@router.get("/")
async def get_crypto_currencies():
    return await cmc_client.get_listings()

@router.get("/{currency_id}")
async def get_crypto_currency(currency_id: int):
    return await cmc_client.get_currency(currency_id)