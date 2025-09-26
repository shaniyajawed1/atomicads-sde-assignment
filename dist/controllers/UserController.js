"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AlertRepository_1 = require("../repositories/AlertRepository");
const UserAlertPreferenceRepository_1 = require("../repositories/UserAlertPreferenceRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class UserController {
    // Fetch alerts for a user
    static getAlerts(req, res) {
        const userId = Number(req.params.userId);
        const userAlerts = AlertRepository_1.alerts.filter(alert => {
            const pref = UserAlertPreferenceRepository_1.userAlertPreferences.find(p => p.alertId === alert.id && p.userId === userId);
            // Only active alerts not snoozed
            const now = new Date();
            if (alert.expiryTime < now)
                return false;
            if (pref?.snoozedUntil && pref.snoozedUntil > now)
                return false;
            // Check visibility
            if (alert.visibility.organization)
                return true;
            if (alert.visibility.users?.includes(userId))
                return true;
            const user = UserRepository_1.users.find(u => u.id === userId);
            if (user && alert.visibility.teams?.includes(user.teamId))
                return true;
            return false;
        });
        res.json(userAlerts);
    }
    // Snooze an alert for the day
    static snoozeAlert(req, res) {
        const userId = Number(req.params.userId);
        const alertId = Number(req.params.alertId);
        const now = new Date();
        const snoozeUntil = new Date();
        snoozeUntil.setHours(23, 59, 59); // end of today
        const existing = UserAlertPreferenceRepository_1.userAlertPreferences.find(p => p.userId === userId && p.alertId === alertId);
        if (existing) {
            existing.snoozedUntil = snoozeUntil;
        }
        else {
            UserAlertPreferenceRepository_1.userAlertPreferences.push({
                userId,
                alertId,
                read: false,
                snoozedUntil
            });
        }
        res.json({ message: "Alert snoozed for today" });
    }
    // Mark alert as read/unread
    static markRead(req, res) {
        const userId = Number(req.params.userId);
        const alertId = Number(req.params.alertId);
        const { read } = req.body;
        let pref = UserAlertPreferenceRepository_1.userAlertPreferences.find(p => p.userId === userId && p.alertId === alertId);
        if (pref) {
            pref.read = read;
        }
        else {
            UserAlertPreferenceRepository_1.userAlertPreferences.push({ userId, alertId, read });
        }
        res.json({ message: `Alert marked as ${read ? "read" : "unread"}` });
    }
}
exports.UserController = UserController;
