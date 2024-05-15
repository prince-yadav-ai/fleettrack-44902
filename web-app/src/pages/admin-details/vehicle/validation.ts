import * as Yup from "yup";

export const vehicleFormInitialValues = {
  vehicle_id: "",
  creation_date: "",
  server_id: "",
  firmware_version: "",
  unique_id: "",
  previous_unique_id: "",
  unique_id_last_change: "",
  is_active: false,
  vehicle_description: "",
  short_name: "",
  vin: "",
  vehicle_make: "",
  vehicle_model: "",
  license_plate: "",
  license_expiration: "",
  equipment_type: "",
  equipment_status: "",
  asset_type: "",
  vehicle_class: "",
  imei_number: "",
  serial_number: "",
  phone_number: "",
  email: "",
  group_pushpin_id: "",
  map_route_color: "",
  ignition_input: "",
  maximum_speed: "",
  driver_id: "",
  driver_name: "",
  driver_phone_number: "",
  fuel_type: "",
  fuel_capacity: "",
  fuel_economy: "",
  fuel_cost: "",
  recorder_id: "",
  recorder_on: "",
  recorder_type: "",
  previous_recorder_id: "",
  recorder_id_last_changed: "",
  list_of_groups: "",
  all_vehicles: "",
}

export const vehicleFormValidationSchema = Yup.object().shape({});

export const groupMembershipFormValidationSchema = Yup.object().shape({});