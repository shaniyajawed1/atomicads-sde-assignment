export interface UserAlertPreference {
    userId: number;
    alertId: number;
    read: boolean;
    snoozedUntil?: Date; // ✅ make sure it's "snoozedUntil"
}
