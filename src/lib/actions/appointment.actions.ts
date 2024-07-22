"use server";
import { parseStringify } from "@/app/lib/lib.utlis";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { ID } from "node-appwrite";

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
