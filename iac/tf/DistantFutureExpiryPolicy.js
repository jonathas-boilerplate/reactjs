import ExpiryPolicy from './ExpiryPolicy.js';

export default class DistantFutureExpiryPolicy extends ExpiryPolicy {
    getExpiryDate() {
        this.expiryDate = new Date(this.creationDate);
        this.expiryDate.setDate(this.expiryDate.getDate() + 10000);

        return this.expiryDate;
    }
}