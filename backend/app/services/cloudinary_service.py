import uuid

import cloudinary
import cloudinary.uploader

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


# ==========================================================
# Cloudinary Configuration
# ==========================================================

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


class CloudinaryService:

    ALLOWED_TYPES = {
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    }

    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

    # ==========================================================
    # Upload Image
    # ==========================================================

    async def upload_image(
        self,
        image: UploadFile,
        folder: str,
    ) -> dict:

        if image.content_type not in self.ALLOWED_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only JPG, JPEG, PNG and WEBP images are allowed.",
            )

        contents = await image.read()

        if len(contents) > self.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Image size must be less than 5 MB.",
            )

        try:

            print("\n========== CLOUDINARY UPLOAD STARTED ==========")
            print(f"Folder: {folder}")
            print(f"Filename: {image.filename}")
            print(f"Content Type: {image.content_type}")

            result = cloudinary.uploader.upload(
                contents,
                folder=folder,
                public_id=str(uuid.uuid4()),
                overwrite=False,
                resource_type="image",
            )

            print("\n========== CLOUDINARY RESPONSE ==========")
            print(result)

            return {
                "url": result["secure_url"],
                "public_id": result["public_id"],
            }

        except Exception as e:

            print("\n========== CLOUDINARY ERROR ==========")
            print(repr(e))

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Cloudinary upload failed: {str(e)}",
            )

    # ==========================================================
    # Delete Image
    # ==========================================================

    def delete_image(
        self,
        public_id: str,
    ):

        if not public_id:
            return

        try:

            cloudinary.uploader.destroy(
                public_id,
                resource_type="image",
            )

        except Exception:
            pass


cloudinary_service = CloudinaryService()