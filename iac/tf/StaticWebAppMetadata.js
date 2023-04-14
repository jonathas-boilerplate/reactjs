import BaseMetadata from './BaseMetadata.js';

class StaticWebAppMetadata extends BaseMetadata {
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
        return `stapp-${this.args.appName}-${this._getEnvironmentAcronym()}-${this._getVersion()}`;
    }
}

console.log(JSON.stringify(new StaticWebAppMetadata().get()));
