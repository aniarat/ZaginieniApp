using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using zaginieni_webapp.Helpers;

namespace zaginieni_webapp.Services
{
    public class PhotoService : IPhotoService
    {
        //private readonly Cloudinary _cloudinary;
        ////private readonly BlobServiceClient _blobServiceClient;
        //private readonly IWebHostEnvironment _hostEnvironment;
        public CloudStorageAccount storageAccount;

        public PhotoService(string AccountName, string AccountKey)
        {
            string UserConnectionString = string.Format("storage", AccountName, AccountKey);
            storageAccount = CloudStorageAccount.Parse(UserConnectionString);
            
        }

        public async Task<CloudBlockBlob> UploadBlobAsync(string BlobName, string ContainerName, IFormFile file)
        {
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(ContainerName.ToLower());
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(BlobName);

            try
            {
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    ms.Seek(0, SeekOrigin.Begin);
                    await blockBlob.UploadFromStreamAsync(ms);
                }
                return blockBlob;
            }
            catch (Exception e)
            {
                var r = e.Message;
                return null;
            }
        }

        public void DeleteBlob(string BlobName, string ContainerName)
        {

            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(BlobName);
            blockBlob.DeleteAsync();
        }

        public CloudBlockBlob DownloadBlob(string BlobName, string ContainerName)
        {
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(BlobName);
            return blockBlob;
        }
     }
  }
