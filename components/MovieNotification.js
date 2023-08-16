import { View } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'BACKGROUND_NOTIFICATION_TASK';
const FRIDAY = 5;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

TaskManager.defineTask(TASK_NAME, () => {
    try {
        if (new Date().getDay() === FRIDAY) {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'New trending movies!',
                    body: 'Click on and check!'
                },
                trigger: null
            });
        }

        return BackgroundFetch.Result.NewData;
    } catch (err) {
        return BackgroundFetch.Result.Failed;
    }
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
                await BackgroundFetch.registerTaskAsync(TASK_NAME, {
                    minimumInterval: 24 * 60 * 60,
                    stopOnTerminate: false,
                    startOnBoot: true,
                });
            }
        })();
    }, []);

    return <View />;
}
