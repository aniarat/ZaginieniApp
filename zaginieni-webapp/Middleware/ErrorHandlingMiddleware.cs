using zaginieni_webapp.Exceptions;
using zaginieni_webapp.Middleware;

namespace zaginieni_webapp.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context); //wywołanie następnego middleware
            }
            catch (BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch (ForbidException forbidException)
            {
                context.Response.StatusCode = 403;
            }
            catch (NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404; //zwracanie kodu statusu do klienta
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                context.Response.StatusCode = 500; //server error
                await context.Response.WriteAsync("Coś poszło nie tak.");
            }
        }
    }
}
