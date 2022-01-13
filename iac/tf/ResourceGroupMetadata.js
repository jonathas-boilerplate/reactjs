import BaseMetadata from './BaseMetadata.js';

class ResourceGroupMetadata extends BaseMetadata {
    get() {
        return {
            "name": this._getName(),
            "created": this.creationDate.toDateString(),
            "expires": this._getExpiryPolicy().getExpiryDate().toDateString(),
            "environment": this.args.environment,
            "context": this.args.context
        };
    }

    _getName() {
        return `rg-${this.args.appName}-${this._getEnvironmentAcronym()}-${this._getVersion()}`;
    }
}

console.log(JSON.stringify(new ResourceGroupMetadata().get()));
