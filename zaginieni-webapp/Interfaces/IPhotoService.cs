using CloudinaryDotNet.Actions;
using Microsoft.WindowsAzure.Storage.Blob;

namespace zaginieni_webapp.Interfaces
{
    public interface IPhotoService
    {
        Task<CloudBlockBlob> UploadBlobAsync(string BlobName, string ContainerName, IFormFile file);
        void DeleteBlob(string BlobName, string ContainerName);
        CloudBlockBlob DownloadBlob(string BlobName, string ContainerName);
    }
}
