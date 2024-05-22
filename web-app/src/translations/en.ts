import { toast } from "react-toastify";

export const language_en = {
  email_address: "Email address",
  email_address_placeholder: "Enter email address",
  password: "Password",
  password_placeholder: "Enter your password",
  login: "Login",
  forgot_your_password: "Forgot your password?",
  landingScreen: {
    heading: 'Navigate Efficiency, Control, and Safety with Fleet Track.',
    content: 'Fleet Track is a fleet management solution that monitors vehicle locations in real-time, analyses fuel consumption patterns, and ensures safety compliance. With customisable reporting features and intuitive interfaces, Fleet Track provides visibility and control over your fleet, allowing you to streamline performance, enhance efficiency, and reduce costs. Make informed decisions and transform your fleet management experience with Fleet Track today.',
  },
  loginScreen: {
    toast: {
      session_expired: "Session expired. Please login again.",
      logging_you_in: "Logging you in...",
      check_email_for_code: "Please check your email for the verification code.",
      login_failed: "Login failed. Please check your email and password.",
    }
  },
  forgotPasswordScreen: {
    heading: "Forgot your password?",
    sub_heading: "Please enter your email address below and we will send you a 6-digit code to help you reset your password",
    submit_button: "Send Reset Code",
    toast: {
      sending_reset_code: "Sending reset code...",
      reset_code_sent: "Reset code sent. Please check your email.",
      reset_code_failed: "Failed to send reset code. Please check your email.",
    }
  },
  cancel: "Cancel",
  resetPasswordScreen: {
    heading: "Reset Password",
    sub_heading_1: "We have sent a 6-digit code to your email. Please enter below the code that you have received.",
    sub_heading_2: "Please set up your new password below",
    verification_code: "Verification Code",
    verification_code_placeholder: "Please enter the code here to verify",
    new_password: "New Password",
    new_password_placeholder: "Enter your new password",
    confirm_new_password: "Confirm New Password",
    confirm_new_password_placeholder: "Re-enter your new password",
    submit_button: "Reset Password",
    toast: {
      verifying_code: "Verifying code...",
      code_verified: "Your password has been changed. Please log in with your new password.",
      code_verification_failed: "Code verification failed. Please check the code that you have entered.",
    }
  },
  twoFactorAuthenticationScreen: {
    heading: "Verification",
    sub_heading_1: "We have sent a 6-digit verification code to your email address", // {{email}}
    sub_heading_2: ". Please enter the code below to verify your account",
    verification_code: "Verification Code",
    verification_code_placeholder: "Please enter the code here to verify",
    submit_button: "Verify and Sign In",
    code_not_received: "Did not receive the code?",
    resend_code: "Resend Code",
    toast: {
      no_email: "We could not verify your email address. Please login again.",
      resending_code: "Resending code...",
      code_sent: "We have sent you the code on your email.",
      code_send_failed: "Failed to send the code. Please try again.",
      verifying_code: "Verifying code...",
      code_verified: "You have been verified. Welcome to FleetTrack!",
      code_verification_failed: "Code verification failed. Please check the code that you have entered.",
      code_invalid: "The code you have entered is invalid. Please check the code that you have entered.",
    }
  },
  accountSetupScreen: {
    heading: "Account Setup",
    sub_heading: "Please verify your information & setup up a new password to proceed",
    name: "Name",
    email: "Email",
    organization_name: "Organization Name",
    role: "Role",
    new_password: "New Password",
    new_password_placeholder: "Enter your new password",
    confirm_new_password: "Confirm New Password",
    confirm_new_password_placeholder: "Re-enter your new password",
    submit_button: "Update & Proceed",
    toast: {
      onboarded: "You have successfully setup your account. Please login with your new password.",
      onboarding_failed: "Failed to setup your account. Please check the information that you have entered.",
    }
  },
  toast: {
    general_error: "An error occurred. Please try again.",
  },
  changePasswordScreen: {
    heading: "Update Password",
    sub_heading_1: "Please enter your current password below",
    sub_heading_2: "Please set up your new password below",
    current_password: "Current Password",
    current_password_placeholder: "Enter your current password",
    new_password: "New Password",
    new_password_placeholder: "Enter your new password",
    confirm_new_password: "Confirm New Password",
    confirm_new_password_placeholder: "Re-enter your new password",
    submit_button: "Change Password",
    toast: {
      password_changed: "Your password has been changed.",
      password_change_failed: "Your password could not be changed. Please check the information that you have entered.",
    }
  },
  dashboard: {
    sidemenu: {
      dashboard: "Dashboard",
      map_overview: "Map Overview",
      reports: "Reports",
      manage_roles: "Manage Roles",
      maintenance_admin: "Maintenance Admin",
      group_admin: "Group Admin",
      administrators: "Administrators",
      administration: "Administration",
      manage_rule_alert: "Manage Rule/Alert",
      camera_admin: "Camera Admin",
      main_menu: "Main Menu",
      admins: {
        users: "Users",
        roles: "Roles",
        vehicles: "Vehicles",
        groups: "Groups",
        fleettags: "Fleet Tags",
        drivers: "Drivers",
        geozones: "Geozones",
      }
    },
    top: {
      admins: "Admins",
      account: "Account",
      change_password: "Change Password",
      logout: "Logout",
    },
    profile: {
      account: {
        heading: "Account Informantion",
        sub_heading: "Edit Account Information",
        accord_general_details: "General Details",
        accord_maintenance_interval_labels: "Maintenance Interval Labels",
        accord_scorecard_weight_factors: "Scorecard Weight Factors",
        toast: {
          account_updated: "Account has been updated successfully.",
        },
        form : {
          account_id: "Account ID",
          account_description: "Account Description",
          contact_name: "Contact Name",
          contact_phone_number: "Contact Phone Number",
          contact_email: "Contact Email",
          private_cost: "Private Cost",
          idle_gas_usage: "Idle Gas Usage",
          distance_gas_usage: "Distance Gas Usage",
          auto_update_interval_for_maps: "Auto Update Interval for Maps",
          drivers_assigned_to_devices: "Drivers Assigned to Devices",
          enable_map_clustering: "Enable Map Clustering",
          open_reports_in_new_tab: "Open Reports in New Tab",
          sync_driverId_from_driver_admin: "Sync Driver ID from Driver Admin",
          has_snowplows: "Has Snowplows",
          hide_total_rows_in_csv: "Hide Total Rows in CSV",
          timezone: "Timezone",
          speed_units: "Speed Units",
          distance_units: "Distance Units",
          volume_units: "Volume Units",
          economy_units: "Economy Units",
          pressure_units: "Pressure Units",
          temperature_units: "Temperature Units",
          latitude_longitude_format: "Latitude Longitude Format",
          route_segment_color_rule: "Route Segment Color Rule",
          route_line_thickness: "Route Line Thickness",
          multi_vehicle_map_name: "Multi Vehicle Map Name",
          device_title: "Device Title",
          device_title_plural: "Plural",
          device_group_title: "Group Title",
          device_group_title_plural: "Plural",
          address_title: "Address Title",
          address_title_plural: "Plural",
          default_login_userId: "Default Login User ID",
          default_overlay: "Default Overlay",
          last_maintenance_1: "Last Maintenance #1",
          last_maintenance_2: "Last Maintenance #2",
          last_maintenance_3: "Last Maintenance #3",
          last_maintenance_4: "Last Maintenance #4",
          last_maintenance_5: "Last Maintenance #5",
          last_maintenance_6: "Last Maintenance #6",
          last_maintenance_7: "Last Maintenance #7",
          last_maintenance_8: "Last Maintenance #8",
          last_maintenance_9: "Last Maintenance #9",
          last_maintenance_10: "Last Maintenance #10",
          last_eng_hours_maint_1: "Last Eng Hours Maint #1",
          last_eng_hours_maint_2: "Last Eng Hours Maint #2",
          last_eng_hours_maint_3: "Last Eng Hours Maint #3",
          last_eng_hours_maint_4: "Last Eng Hours Maint #4",
          last_eng_hours_maint_5: "Last Eng Hours Maint #5",
          last_service_time_1: "Last Service Time #1",
          last_service_time_2: "Last Service Time #2",
          last_service_time_3: "Last Service Time #3",
          last_service_time_4: "Last Service Time #4",
          last_service_time_5: "Last Service Time #5",
          harsh_braking: "Harsh Braking",
          harsh_acceleration: "Harsh Acceleration",
          speeding: "Speeding",
          reverse: "Reverse",
          seatbelt_off: "Seatbelt Off",
          harsh_cornering: "Harsh Cornering",
          idle_ratio: "Idle Ratio",
          impact_crash_ai: "Impact/Crash AI",
          cellphone_use_ai: "Cellphone Use AI",
          distracted_driving_ai: "Distracted Driving AI",
          drinking_eating_ai: "Drinking/Eating AI",
          smoking_ai: "Smoking AI",
          possible_fatiuge_ai: "Possible Fatigue AI",
          obstructed_camera_ai: "Obstructed Camera AI",
          tailgating_ai: "Tailgating AI",
        }
      }
    }
  },
  type_here_to_search: "Type here to search...",
  pagination: {
    number_of_items: "Number of items",
  },
  no_items_found: "No items found",
  admins: {
    refresh_data: "Refresh Data",
    completeCreation: "Please fill the form a click SAVE to complete the process",
    edit_columns: {
      heading: "Edit Columns",
      sub_heading: "Edit the selection of your columns. See the information that is most relevant to your business",
      submit_button: "Update Selection",
    },
    filters: {
      active: "Active",
      inactive: "Inactive",
      both: "Both",
    },
    users: {
      heading: "Users",
      sub_heading: "Create users and delete users in the system to view maps and vehicle information",
      add_new: "Add New User",
      listing_heading: "User Listing",
      search_placeholder: "Search users here...",
      create_new: {
        heading: "Add New User",
        sub_heading: "Please provide the information below to create a New User",
        user_name: "User Name",
        user_name_placeholder: "Please provide a user's full name",
        email_address: "Email ID",
        email_address_placeholder: "Please provide an email address",
        acl_role: "Default ACL Role",
        acl_role_placeholder: "Please select a role",
        submit_button: "Create New User & Send Invite",
        bottom_text_1: "Did not find a suitable role?",
        bottom_text_click_here: "Click Here",
        bottom_text_2: "to create new ACL Role",
        create_failed: "Failed to create user. Please check the information that you have entered.",
        create_success: "User has been created successfully. An email has been sent to the user with a link to setup their account.",
      },
      detailsPage: {
        heading: "User Specific View",
        sub_heading: "Create Users and delete users in the system to view maps and vehicle information",
        listing_heading: "Users",
        accord_general_details: "General Details",
        accord_authorized_groups: "Authorized Groups",
        accord_user_access_control: "User Access Control",
        toast: {
          user_updated: "User has been updated successfully.",
          user_deleted: "User has been deleted successfully.",
        }
      }
    },
    vehicles: {
      heading: "Vehicles",
      sub_heading: "Create vehicles and vehicle details for monitoring",
      add_new: "Add New Vehicle",
      listing_heading: "Vehicle Listing",
      search_placeholder: "Search vehicles here...",
      create_new: {
        heading: "Add New Vehicle",
        sub_heading: "Please provide the information below to create a New Vehicle",
        make: "Vehicle Make",
        make_placeholder: "Please provide the vehicle make",
        model: "Vehicle Model",
        model_placeholder: "Please provide the year of the vehicle",
        vin: "VIN",
        vin_placeholder: "Please provide a valid VIN",
        license_plate: "License Plate",
        license_plate_placeholder: "Please provide a valid license plate",
        submit_button: "Create New Vehicle",
        create_failed: "Failed to create vehicle. Please check the information that you have entered.",
        create_success: "Vehicle has been created successfully.",
      },
      detailsPage: {
        heading: "Vehicle Specific View",
        sub_heading: "Create vehicles and vehicle details for monitoring",
        listing_heading: "Vehicles",
        accord_details: "Details",
        accord_camera_id: "Camera ID",
        accord_group_membership: "Group Membership",
        toast: {
          vehicle_updated: "Vehicle has been updated successfully.",
          vehicle_deleted: "Vehicle has been deleted successfully.",
        },
        form: {
          vehicle_id: "Vehicle ID",
          creation_date: "Creation Date",
          server_id: "Server ID",
          firmware_version: "Firmware Version",
          unique_id: "Unique ID",
          previous_unique_id: "Previous Unique ID",
          unique_id_last_change: "Unique ID Last Change",
          is_active: "Is Active",
          vehicle_description: "Vehicle Description",
          short_name: "Short Name",
          vin: "VIN",
          vehicle_make: "Vehicle Make",
          vehicle_model: "Vehicle Model",
          license_plate: "License Plate",
          license_expiration: "License Expiration",
          equipment_type: "Equipment Type (VIN)",
          equipment_status: "Equipment Status",
          asset_type: "Asset Type",
          vehicle_class: "Vehicle Class",
          imei_number: "IMEI/ESN Number",
          serial_number: "Serial Number",
          phone_number: "SIM Phone",
          email: "SMS Email Address",
          group_pushpin_id: "Group Pushpin ID",
          map_route_color: "Map Route Color",
          ignition_input: "Ignition Input",
          maximum_speed: "Maximum Speed",
          driver_id: "Driver ID",
          driver_name: "Driver Name",
          driver_phone_number: "Driver Phone",
          fuel_type: "Fuel Type",
          fuel_capacity: "Fuel Capacity",
          fuel_economy: "Fuel Economy",
          fuel_cost: "Fuel Cost",
          recorder_id: "Recorder ID",
          recorder_on: "Recorder On",
          recorder_type: "Recorder Type",
          previous_recorder_id: "Previous Recorder ID",
          recorder_id_last_changed: "Recorder ID Last Changed",
          list_of_groups: "List of Groups",
          all_vehicles: "All Vehicles",
        }

      }
    },
    drivers: {
      heading: "Drivers",
      sub_heading: "Add and Delete driver information",
      add_new: "Add New Driver",
      listing_heading: "Driver Listing",
      search_placeholder: "Search drivers here...",
      create_new: {
        heading: "Add New Driver",
        sub_heading: "Please provide the information below to create a New Driver",
        name: "Driver Name",
        name_placeholder: "Please provide the driver's full name",
        email: "Email ID",
        email_placeholder: "Please provide the driver's email address",
        phone: "Phone Number",
        phone_placeholder: "Please provide the driver's phone number",
        submit_button: "Create New Driver",
        create_failed: "Failed to create driver. Please check the information that you have entered.",
        create_success: "Driver has been created successfully.",
      },
      detailsPage: {
        heading: "Driver Specific View",
        sub_heading: "Add and Delete driver information",
        listing_heading: "Drivers",
        accord_details: "Details",
        accord_license_details: "License Details",
        accord_medical_and_other_details: "Medical and Other Details",
        toast: {
          driver_updated: "Driver has been updated successfully.",
          driver_deleted: "Driver has been deleted successfully.",
        },
        form: {
          driver_id: "Driver ID",
          driver_name: "Driver Name",
          nick_name: "Nickname",
          contact_phone: "Contact Phone",
          contact_email: "Contact Email",
          badge_employee_id: "Badge/Employee ID",
          card_id: "Card ID",
          is_active: "Is Active",
          license_type: "License Type",
          license_state: "License State",
          license_number: "License Number",
          license_expiry_date: "License Expiration",
          license_status: "License Status",
          medical_card_no: "Medical Card No",
          medical_card_expiry_date: "Medical Card Expiration",
          hazmat_certified: "Hazmat Certified",
          twic:"Trans Worker ID cred (TWIC)",
          twic_expiry_date: "TWIC Expiration",
          address: "Address",
          vehicle_id: "Vehicle ID",
        }
      }
    },
    groups: {
      heading: "Groups",
      sub_heading: "Edit Group",
      add_new: "Add New Group",
      group: "Group",
      show_inactive_groups: "Show Inactive Groups",
      group_description: "Group Description",
      group_description_placeholder: "The description of the group will be displayed here",
      not_in_selected_group: "Not in Selected Group",
      in_selected_group: "In Selected Group",
      active: "Active: ({{count}})",
      inactive: "Inactive: ({{count}})",
      search_placeholder: "Search vehicles here...",
      add_all: "Add All",
      add_selected: "Add Selected",
      remove_selected: "Remove Selected",
      remove_all: "Remove All",
      toast: {
        group_updated: "Group has been updated successfully.",
        group_deleted: "Group has been deleted successfully.",
      },
      create_new: {
        heading: "Add New Group",
        sub_heading: "Please provide the information below to create a New Group",
        name: "Group Name",
        name_placeholder: "Please provide the group name",
        description: "Group Description",
        description_placeholder: "Please provide a description for the group",
        submit_button: "Create New Group",
        create_failed: "Failed to create driver. Please check the information that you have entered.",
        create_success: "Driver has been created successfully.",
      },
    },
    fleettags: {
      heading: "Fleet Tags",
      sub_heading: "Manage your fleet tags",
      add_new: "Add New Fleet Tag",
      listing_heading: "Fleet Tag Listing",
      search_placeholder: "Search fleet tags here...",
      create_new: {
        heading: "Add New Fleet Tag",
        sub_heading: "Please provide the information below to create a New Fleet Tag",
        name: "Fleet Tag Name",
        name_placeholder: "Please provide a name for the fleet tag",
        submit_button: "Create New Fleet Tag",
        create_failed: "Failed to create fleet tag. Please check the information that you have entered.",
        create_success: "Fleet Tag has been created successfully.",
      },
      detailsPage: {
        heading: "Fleet Tags",
        listing_heading: "Fleet Tag Listing",
        accord_details: "Details",
        form: {
          fleet_tag_id: "Fleet Tag ID",
          fleet_tag_name: "Fleet Tag Name",
          last_event_time: "Last Event Time",
          last_status_code: "Last Status Code",
          in_range: "In Range",
          in_range_device_id: "In Range Device ID",
          last_location: "Last Location",
          last_address: "Last Address",
          last_altitude: "Last Altitude",
          distance_travelled: "Distance Travelled",
          tag_signal_strength: "Tag Signal Strength",
          tag_battery_level: "Tag Battery Level",
          temprature: "Temperature",
        }
      }
    },
    geozones: {
      heading: "Geozones",
      sub_heading: "Add and Delete Geozones Information",
      add_new: "Add New Zone",
      listing_heading: "Geozone Listing",
      search_placeholder: "Search Geozone here...",
      create_new: {
        heading: "Add New Geozone",
        sub_heading: "Please provide the information below to create a New Geozone",
        id: "Zone Id",
        id_placeholder: "Please provide the zone id",
        city: "City",
        type: "Zone Type(Shape)",
        submit_button: "Create New Geozone",
      },
      detailsPage: {
        heading: "Geozone Details",
        listing_heading: "Geozone Listing",
        accord_details: "Details",
        form: {
          description: "Description(Address)",
          city: "City",
          zone_type: "Zone Type(Shape)",
          geocode: "Geocode",
          latitude_longitude: "Latitude/Longitude",
          overlap_priority: "Overlap Priority",
          assign_group: "Assign Group",
          reverse_geocode: "Reverse Geocode",
          arrival_zone: "Arrival Zone",
          departure_zone: "Departure Zone",
          zone_color: "Zone Color",
          speed_limit: "Speed Limit",
        }
      },
    },
  },
  active: "Active",
  inactive: "Inactive",
  both: "Both",
  edit: "Edit",
  update: "Update",
  sms: "SMS",
  command: "Command",
  delete: "Delete",
  save: "Save",
  help: "Help",
  fourZeroFourScreen: {
    heading: "Page Not Found",
    sub_heading: "The page you are looking for does not exist.",
    back_to_home: "Back to Home",
  },
};