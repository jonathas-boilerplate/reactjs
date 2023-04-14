import fs from 'fs';
import SameDayExpiryPolicy from './SameDayExpiryPolicy.js';
import TwoWeeksExpiryPolicy from './TwoWeeksExpiryPolicy.js';
import DistantFutureExpiryPolicy from './DistantFutureExpiryPolicy.js';

export default class BaseMetadata {
    constructor() {
        const buffer = fs.readFileSync(0);
        this.args = JSON.parse(buffer.toString());
        this.creationDate = new Date();
    }

    _getExpiryPolicy() {
        switch (this._getEnvironmentAcronym()) {
            case "prod":
                return new DistantFutureExpiryPolicy(this.creationDate);

            case "dev":
            case "uat":
                return new TwoWeeksExpiryPolicy(this.creationDate);

            default:
                return new SameDayExpiryPolicy(this.creationDate);
        }
    }

    _getEnvironmentAcronym() {
        switch (this.args.environment.toLowerCase()) {
            case "dev":
            case "development":
                return this._getDevelopmentEnvironmentAcronym();

            case "uat":
            case "staging":
            case "testing":
                return "uat";

            case "production":
                return "prod";
        }
    }

    _getDevelopmentEnvironmentAcronym() {
        switch (this.args.context.toLowerCase()) {
            case "main":
            case "master":
                return "dev";

            case "feature":
                return "feat";

            case "patch":
                return "patch";

            case "fix":
                return "fix";
        }
    }

    _getVersion() {
        return this.args.version.padStart(3, '0');
    }
}