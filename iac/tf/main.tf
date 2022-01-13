terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.65"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-dev-terraform-main"
    storage_account_name = "stdevterraformmain"
    container_name       = "terraformreactjs"
    key                  = "terraformreactjs.tfstate"
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg-dev-reactjs-main" {
  name     = "rg-dev-reactjs-main"
  location = "West Europe"
  tags = {
    "created" = "2022-01-12"
    "expires" = "2022-01-12"
    "environment" = "Development"
    "context" = "Main"
    "client" = "Boilerplate"
    "author" = "Jonathas Costa"
  }
}

resource "azurerm_static_site" "sw-dev-reactjs-main" {
  name                = "sw-dev-reactjs-main"
  resource_group_name = "rg-dev-reactjs-main"
  location            = "West Europe"
  tags = {
    "created" = "2022-01-12"
    "expires" = "2022-01-12"
    "environment" = "Development"
    "context" = "Main"
    "client" = "Boilerplate"
    "author" = "Jonathas Costa"
  }
}