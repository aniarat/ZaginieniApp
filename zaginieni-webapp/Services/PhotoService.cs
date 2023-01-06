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
        //private readonly ILogger<PhotoService> _logger;
        //private readonly IWebHostEnvironment _hostEnvironment;
        public CloudStorageAccount storageAccount;

        public PhotoService(string AccountName, string AccountKey)
        {
            string UserConnectionString = string.Format("DefaultEndpointsProtocol=https;AccountName=missingpeoplephotos;AccountKey=gkJz93qhSBLMP6emdL/J4OAqJfyjatfdgQFPR9eH1z8OWyfy/2zWLKUd+MnTFfDkjIJ51jCdcKvv+AStEBHHbQ==;EndpointSuffix=core.windows.net", AccountName, AccountKey);
            storageAccount = CloudStorageAccount.Parse(UserConnectionString);
            //var account = new Account
            //(
            //    config.Value.CloudName,
            //    config.Value.ApiKey,
            //    config.Value.ApiSecret
            //);
            //_cloudinary = new Cloudinary(account);
            ////_blobServiceClient = blobServiceClient;
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

        //[NonAction]
        //public async Task<string> SaveImage(IFormFile imageFile)
        //{
        //    string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
        //    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
        //    var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

        //    using (var fileStream = new FileStream(imagePath, FileMode.Create))
        //    {
        //        await imageFile.CopyToAsync(fileStream);
        //    }
        //    return imageName;
        //}

        //public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        //{
        //    var uploadResult = new ImageUploadResult();

        //    if (file.Length > 0)
        //    {
        //        using var stream = file.OpenReadStream();
        //        var uploadParams = new ImageUploadParams
        //        {
        //            File = new FileDescription(file.FileName, stream),
        //            Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
        //        };
        //        uploadResult = await _cloudinary.UploadAsync(uploadParams);
        //    }
        //    return uploadResult;
        //}

        //public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        //{
        //    var deleteParams = new DeletionParams(publicId);
        //    var result = await _cloudinary.DestroyAsync(deleteParams);
        //    return result;
        //}

        //private string GeneratePhotoName(string photoName, string personName)
        //{
        //    string imageName =
        //    //        new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');

        //    //    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
        //}

        //public async Task<PhotoDto> AddPhotoAsync(IFormFile file)
        //{
        //    // Get the Blob reference of the container
        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    PhotoDto response = new();
        //    // Method to create our container if it doesn’t exist.
        //    var createResponse = await blobContainer.CreateIfNotExistsAsync();
        //    // If container successfully created, then set public access type to Blob.
        //    if (createResponse != null && createResponse.GetRawResponse().Status == 201)
        //        await blobContainer.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
        //    // Method to create a new Blob client.
        //    var blob = blobContainer.GetBlobClient(file.FileName);
        //    // Create a file stream and use the UploadSync method to upload the Blob.
        //    await using (var fileStream = file.OpenReadStream())
        //    {
        //        await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = file.ContentType });
        //    }

        //    response.Url = blob.Uri.AbsoluteUri;
        //    return response;
        //}
    }

}
            //PhotoDto response = new();

            //var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

            //var blobClient = blobContainer.GetBlobClient(file.FileName);

            //await blobClient.UploadAsync(file.OpenReadStream());

        //    //return response;
        //}

        //public async Task GetPhotoAsync(Photo photo)
        //{
        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    var blobClient = blobContainer.GetBlobClient(photo.PhotoFile.FileName);

        //    await blobClient.UploadAsync(photo.PhotoFile.OpenReadStream());
        //}

        //public async Task<PhotoDto> AddPhotoAsync(IFormFile file)
        //{
        //    PhotoDto response = new();

        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    try
        //    {
        //        // Get a reference to the blob just uploaded from the API in a container from configuration settings
        //        BlobClient client = blobContainer.GetBlobClient(file.FileName);

        //        // Open a stream for the file we want to upload
        //        await using (Stream? data = file.OpenReadStream())
        //        {
        //            // Upload the file async
        //            await client.UploadAsync(data);
        //        }

        //        // Everything is OK and file got uploaded
        //        response.Status = $"Zdjęcie {file.FileName} dodano do profilu osoby zaginionej.";
        //        response.Error = false;
        //        response.Photo.Uri = client.Uri.AbsoluteUri;
        //        response.Photo.PublicId = client.Name;
        //        //response.Photo.Name = client.Name;


        //    }
        //    // If the file already exists, we catch the exception and do not upload it
        //    catch (RequestFailedException ex)
        //       when (ex.ErrorCode == BlobErrorCode.BlobAlreadyExists)
        //    {
        //        _logger.LogError($"File with name {file.FileName} already exists in container. Set another name.'");
        //        response.Status = $"File with name {file.FileName} already exists. Please use another name to store your file.";
        //        response.Error = true;
        //        return response;
        //    }
        //    // If we get an unexpected error, we catch it here and return the error message
        //    catch (RequestFailedException ex)
        //    {
        //        // Log error to console and create a new response we can return to the requesting method
        //        _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
        //        response.Status = $"Unexpected error: {ex.StackTrace}. Check log with StackTrace ID.";
        //        response.Error = true;
        //        return response;
        //    }

        //    // Return the BlobUploadResponse object
        //    return response;
        //}

        //public async Task<Photo> DownloadPhotoAsync(string publicId)
        //{
        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    BlobClient file = blobContainer.GetBlobClient(publicId);

        //    //if (await file.ExistsAsync())
        //    //{
        //        var data = await file.OpenReadAsync();
        //        Stream blobContent = data;

        //        var downloadContent = await file.DownloadContentAsync();

        //        string id = publicId;
        //        string contentType = downloadContent.Value.Details.ContentType;
         

        //}

        //try
        //{
        //    // Get a reference to the blob uploaded earlier from the API in the container from configuration settings
        //    BlobClient file = blobContainer.GetBlobClient(publicId);

        //    // Check if the file exists in the container
        //    if (await file.ExistsAsync())
        //    {
        //        var data = await file.OpenReadAsync();
        //        Stream blobContent = data;

        //        // Download the file details async
        //        var content = await file.DownloadContentAsync();

        //        // Add data to variables in order to return a BlobDto (Photo)
        //        string name = publicId;
        //        string contentType = content.Value.Details.ContentType;

        //        // Create new BlobDto with blob data from variables
        //        return new Photo { Content = blobContent, Name = name, ContentType = contentType };
        //    }
        //}
        //catch (RequestFailedException ex)
        //    when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
        //{
        //    // Log error to console
        //    _logger.LogError($"Nie znaleziono zdjęcia {publicId}.");
        //}
        //// File does not exist, return null and handle that in requesting method
        //return null;


        //public async Task<PhotoDto> DeletePhotoAsync(string publicId)
        //{
        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    BlobClient file = blobContainer.GetBlobClient(publicId);

        //    await file.DeleteAsync();

        //    return new PhotoDto { Status = $"Zdjęcie: {publicId} usunięto." };

            //BlobClient file = blobContainer.GetBlobClient(publicId);

            //try
            //{
            //    // Delete the file
            //    await file.DeleteAsync();
            //}
            //catch (RequestFailedException ex)
            //    when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
            //{
            //    // File did not exist, log to console and return new response to requesting method
            //    _logger.LogError($"Nie znaleziono zdjęcia {publicId}.");
            //    return new PhotoDto { Error = true, Status = $"Nie znaleziono zdjęcia {publicId}."};
            //}

            //// Return a new BlobResponseDto to the requesting method
            //return new PhotoDto { Error = false, Status = $"Zdjęcie: {publicId} usunięto." };

        //}

        //public async Task<List<Photo>> ListPhotosAsync()
        //{
        //    //var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    //List<Photo> photos = new List<Photo>();

        //    //await foreach (BlobItem file in blobContainer.GetBlobsAsync())
        //    //{
        //    //    string uri = blobContainer.Uri.ToString();
        //    //    var name = file.Name;
        //    //    var fullUri = $"{uri}/{name}";

        //    //    photos.Add(new Photo
        //    //    {
        //    //        Uri = fullUri,
        //    //        Name = name,
        //    //        ContentType = file.Properties.ContentType
        //    //    });
        //    //}
        //    //return photos;
        //}

        //public async Task<byte[]> DeletePhotoAsync(string imageName)
        //{
        //    var blobContainer = _blobServiceClient.GetBlobContainerClient("files-container");

        //    var blobClient = blobContainer.GetBlobClient(imageName);


        //    await blobClient.UploadAsync(photo.PhotoFile.OpenReadStream());
        //}
    
