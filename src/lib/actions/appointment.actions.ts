"use server";
import { parseStringify } from "@/app/lib/lib.utlis";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { Appointment } from "../../../types/appwrite.types";

export const CreateAppointment = async (
  appoinment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appoinment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error();
  }
};

export const getAppointment = async (appoinmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appoinmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error();
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error();
  }
};
