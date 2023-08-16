import { View } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from "expo-notifications";

const WEDNESDAY = 3;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

export default function MovieNotification() {
    async function validPermit() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            return newStatus === 'granted';
        }
        return true;
    }

    useEffect(() => {
        (async () => {
            if (await validPermit()) {
                const today = new Date();

                if (today.getDay() === WEDNESDAY) {
                    const targetTime = new Date();
                    targetTime.setHours(15, 30, 0, 0);

                    if (today.getTime() < targetTime.getTime()) {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: 'New trending movies!',
                                body: 'Click on and check!'
                            },
                            trigger: {
                                year: today.getFullYear(),
                                month: today.getMonth(),
                                day: today.getDate(),
                                hour: 14,
                                minute: 55,
                                second: 0
                            }
                        });
                    }
                }
            }
        })();
    }, []);

    return <View />;
}
