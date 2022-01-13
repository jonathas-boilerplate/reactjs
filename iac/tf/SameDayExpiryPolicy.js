import ExpiryPolicy from './ExpiryPolicy.js';

export default class SameDayExpiryPolicy extends ExpiryPolicy {
    getExpiryDate() {
        this.expiryDate = new Date(this.creationDate);
        this.expiryDate.setDate(this.expiryDate.getDate() + 0);

        return this.expiryDate;
    }
}