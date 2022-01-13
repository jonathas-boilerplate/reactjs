terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.65"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state-dev-001"
    storage_account_name = "stterraformstatedev001"
    container_name       = data.external.ResourceGroupMetadata.result.name
    key                  = "terraform.tfstate"
  }

  required_version = ">= 1.1.0"
}

variable "appName" {
  default = "min-reactjs"
}

variable "environment" {
  default = "Development"
}

variable "context" {
  default = "Feature"
}

variable "appVersion" {
  default = "1"
}

data "external" "ResourceGroupMetadata" {
  program = ["node", "${path.module}/ResourceGroupMetadata.js"]
  query = {
    appName     = var.appName
    version     = var.appVersion
    environment = var.environment
    context     = var.context
  }
}

data "external" "StaticWebAppMetadata" {
  program = ["node", "${path.module}/StaticWebAppMetadata.js"]
  query = {
    appName     = var.appName
    version     = var.appVersion
    environment = var.environment
    context     = var.context
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource-group" {
  name     = data.external.ResourceGroupMetadata.result.name
  location = "West Europe"
  tags = {
    "created"     = data.external.ResourceGroupMetadata.result.created
    "expires"     = data.external.ResourceGroupMetadata.result.expires
    "environment" = data.external.ResourceGroupMetadata.result.environment
  }
}

resource "azurerm_static_site" "static-web-app" {
  name                = data.external.StaticWebAppMetadata.result.name
  resource_group_name = data.external.ResourceGroupMetadata.result.name
  location            = "West Europe"
  tags = {
    "created"     = data.external.StaticWebAppMetadata.result.created
    "expires"     = data.external.StaticWebAppMetadata.result.expires
    "environment" = data.external.StaticWebAppMetadata.result.environment
    "context"     = data.external.StaticWebAppMetadata.result.context
  }
}