using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SimpleCrm.SqlDbServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.Extensions;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using SimpleCrm.WebApi.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace SimpleCrm.WebApi
{
    public class Startup
    {
        private const string SecretKey = "Iambatmansadlfkjhsadflkj3087u4we38ru4";
        private readonly SymmetricSecurityKey_signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var googleOptions = Configuration.GetSection(nameof(GoogleAuthSettings));
            services.Configure<GoogleAuthSettings>(options =>
            {
                options.ClientId = googleOptions[nameof(GoogleAuthSettings.ClientId)];
                options.ClientSecret = googleOptions[nameof(GoogleAuthSettings.ClientSecret)];
            });
            var microsoftOptions = Configuration.GetSection(nameof(MicrosoftAuthSettings));
            services.Configure<MicrosoftAuthSettings>(options =>
            {
                options.ClientId = googleOptions[nameof(MicrosoftAuthSettings.ClientId)];
                options.ClientSecret = googleOptions[nameof(MicrosoftAuthSettings.ClientSecret)];
            });

            services.AddDbContext<SimpleCrmDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("SimpleCrmConnection")));

            services.AddDbContext<CrmIdentityDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("SimpleCrmConnection")));

            var jwtOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms./*HmacSha256*/);
            }
            var tokenValidationPrms = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)],
                ValidateAudience = true,
                ValidAudience = jwtOptions[nameof(JwtIssuerOptions.Audience)],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,
                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
                services.AddAuthentication(options =>
                {   //tells ASP.Net Identity the application is using JWT
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(configureOptions =>
                {   //tells ASP.Net to look for Bearer authentication with these options
                    configureOptions.ClaimsIssuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)];
                    configureOptions.TokenValidationParameters = tokenValidationPrms;
                    configureOptions.SaveToken = true; // allows token access in controller
                });
                services.AddAuthorization(options =>
                {
                    options.AddPolicy("ApiUser", policy => policy.RequireClaim(
                    Constants.JwtClaimIdentifiers.Rol,
                    Constants.JwtClaims.ApiAccess
                }

                var identityBuilder = services.AddIdentityCore<CrmUser>(o =>
                {
                    //add any custom password rules here
                });
                identityBuilder = new IdentityBuilder(
                    identityBuilder.UserType,
                    typeof(IdentityRole),
                    identityBuilder.Services);
                identityBuilder.AddEntityFrameworkStores<CrmIdentityDbContext>();
                identityBuilder.AddRoleValidator<RoleValidator<IdentityRole>>();
                identityBuilder.AddRoleManager<RoleManager<IdentityRole>>();
                identityBuilder.AddSignInManager<SignInManager<CrmUser>>();
                identityBuilder.AddDefaultTokenProviders();

                services.AddControllersWithViews();
                services.AddRazorPages();
                services.AddSpaStaticFiles(config =>
                {
                    config.RootPath = Configuration["SpaRoot"];
                });

                services.AddSingleton<IJwttFactory>();
                services.AddScoped<ICustomerData, SqlCustomerData>();
            });

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    app.UseDatabaseErrorPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                    app.UseHsts();
                }
                app.UseHttpsRedirection();
                app.UseStaticFiles();
                app.UseSpaStaticFiles();

                app.UseRouting();

                app.UseAuthentication();
                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {

                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{action}/{id?}");
                    endpoints.MapRazorPages();
                });
                app.UseWhen(
                  context => !context.Request.Path.StartsWithSegments("/api"),
                  appBuilder => appBuilder.UseSpa(spa =>
                  {
                      if (env.IsDevelopment())
                      {
                          spa.Options.SourcePath = "../simple-crm-cli";
                          spa.Options.StartupTimeout = new TimeSpan(0, 0, 300); //300 seconds
                          spa.UseAngularCliServer(npmScript: "start");
                      }
                  }));
            }
        }
    }
}