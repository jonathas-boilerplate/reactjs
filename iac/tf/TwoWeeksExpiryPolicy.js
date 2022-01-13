import ExpiryPolicy from './ExpiryPolicy.js';

export default class TwoWeeksExpiryPolicy extends ExpiryPolicy {
    getExpiryDate() {
        this.expiryDate = new Date(this.creationDate);
        this.expiryDate.setDate(this.expiryDate.getDate() + 14);

        return this.expiryDate;
    }
}