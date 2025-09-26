import { Request, Response } from "express";
import { alerts } from "../repositories/AlertRepository";
import { userAlertPreferences } from "../repositories/UserAlertPreferenceRepository";
import { users } from "../repositories/UserRepository";

export class UserController {

    // Fetch alerts for a user
    static getAlerts(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const userAlerts = alerts.filter(alert => {
            const pref = userAlertPreferences.find(p => p.alertId === alert.id && p.userId === userId);
            // Only active alerts not snoozed
            const now = new Date();
            if (alert.expiryTime < now) return false;
            if (pref?.snoozedUntil && pref.snoozedUntil > now) return false;

            // Check visibility
            if (alert.visibility.organization) return true;
            if (alert.visibility.users?.includes(userId)) return true;
            const user = users.find(u => u.id === userId);
            if (user && alert.visibility.teams?.includes(user.teamId)) return true;
            return false;
        });
        res.json(userAlerts);
    }

    // Snooze an alert for the day
    static snoozeAlert(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const alertId = Number(req.params.alertId);
        const now = new Date();
        const snoozeUntil = new Date();
        snoozeUntil.setHours(23, 59, 59); // end of today

        const existing = userAlertPreferences.find(p => p.userId === userId && p.alertId === alertId);
        if (existing) {
            existing.snoozedUntil = snoozeUntil;
        } else {
            userAlertPreferences.push({
                userId,
                alertId,
                read: false,
                snoozedUntil
            });
        }
        res.json({ message: "Alert snoozed for today" });
    }

    // Mark alert as read/unread
    static markRead(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const alertId = Number(req.params.alertId);
        const { read } = req.body;

        let pref = userAlertPreferences.find(p => p.userId === userId && p.alertId === alertId);
        if (pref) {
            pref.read = read;
        } else {
            userAlertPreferences.push({ userId, alertId, read });
        }
        res.json({ message: `Alert marked as ${read ? "read" : "unread"}` });
    }
}
