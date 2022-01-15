using System;
using System.Text;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Storage.Inputs;
using Pulumi.AzureNative.Web;

class MyStack : Stack
{
    public MyStack()
    {
        var appName = Environment.GetEnvironmentVariable("APP_NAME") ?? throw new Exception("Missing 'APP_NAME' environment variable.");
        var environment = Environment.GetEnvironmentVariable("ENVIRONMENT") ?? throw new Exception("Missing 'ENVIRONMENT' environment variable.");
        var runNumber = Environment.GetEnvironmentVariable("RUN_NUMBER")?.PadLeft(3, '0') ?? throw new Exception("Missing 'RUN_NUMBER' environment variable.");

        var resourceGroupName = new ResourceGroupNameBuilder()
            .AppName(appName)
            .Environment(environment)
            .BuildNumber(runNumber)
            .Build();

        var resourceGroup = new ResourceGroup(resourceGroupName);

        var staticSiteName = new StaticSiteNameBuilder()
            .AppName(appName)
            .Environment(environment)
            .BuildNumber(runNumber)
            .Build();

        var staticApp = new StaticSite(staticSiteName, new StaticSiteArgs
        {
            ResourceGroupName = resourceGroupName            
        });
    }
}

class ResourceGroupNameBuilder
{
    private string? _appName;
    private string? _environment;
    private string? _buildNumber;

    public ResourceGroupNameBuilder AppName(string appName)
    {
        _appName = appName;
        return this;
    }

    public ResourceGroupNameBuilder Environment(string environment)
    {
        _environment = environment;
        return this;
    }

    public ResourceGroupNameBuilder BuildNumber(string buildNumber)
    {
        _buildNumber = buildNumber;
        return this;
    }

    public string Build() => $"rg-{_appName}-{_environment}-{_buildNumber}";
}

class StaticSiteNameBuilder
{
    private string? _appName;
    private string? _environment;
    private string? _buildNumber;

    public StaticSiteNameBuilder AppName(string appName)
    {
        _appName = appName;
        return this;
    }

    public StaticSiteNameBuilder Environment(string environment)
    {
        _environment = environment;
        return this;
    }

    public StaticSiteNameBuilder BuildNumber(string buildNumber)
    {
        _buildNumber = buildNumber;
        return this;
    }

    public string Build() => $"stapp-{_appName}-{_environment}-{_buildNumber}";
}