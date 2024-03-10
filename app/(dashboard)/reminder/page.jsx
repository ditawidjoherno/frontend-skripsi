"use client"
import { useState } from 'react';
import Head from 'next/head';
import ReminderForm from './_components/ReminderForm';
import ReminderList from './_components/ReminderList';

const ReminderPage = () => {
    const [reminders, setReminders] = useState([]);

    const handleAddReminder = (text) => {
        setReminders([...reminders, text]);
    };

    return (
        <div>
            <Head>
                <title>Reminder Page</title>
                <meta name="description" content="Reminder Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen py-10">
                <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Reminder Page</h1>
                    <ReminderForm onAdd={handleAddReminder} />
                    <ReminderList reminders={reminders} />
                </div>
            </main>
        </div>
    );
};

export default ReminderPage;
