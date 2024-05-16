import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, API_SERVER_URL } from "./endpoints";
import {
  CreateOrganizationDriverPayload,
  CreateOrganizationGroupPayload,
  CreateOrganizationUserPayload,
  CreateOrganizationUserResponse,
  CreateOrganizationVehiclePayload,
  EditOrganizationDriverPayload,
  EditOrganizationGroupPayload,
  EditOrganizationUserPayload,
  EditOrganizationVehiclePayload,
  OrganizationEntityListingPayload,
  OrganizationUser,
  SingleOrganizationDriverPayload,
  SingleOrganizationGroupPayload,
  SingleOrganizationUserPayload,
  SingleOrganizationVehiclePayload,
} from "../types/Admin";
import { API_METHODS } from "./constants";
import { handleAuthErrorCode } from "./errorCodes";
import { sessionStorageKeys } from "../../utils/sessionStorageItems";
import { ListingResponse } from "../types/Listing";
import { TUserRole } from "../types/UserRole";
import { TLoggedInUser } from "../types/User";
import { OrganizationVehicle } from "../types/Vehicle";
import { OrganizationDriver } from "../types/Driver";
import { OrganizationGroup } from "../types/Group";

export enum AdminApiTags {
  USER_CREATED = 'USER_CREATED',
  USER_MODIFIED = 'USER_MODIFIED',
  USER_DELETED = 'USER_DELETED',
  USER_SINGLE = 'USER_SINGLE',

  VEHICLE_CREATED = 'VEHICLE_CREATED',
  VEHICLE_MODIFIED = 'VEHICLE_MODIFIED',
  VEHICLE_DELETED = 'VEHICLE_DELETED',
  VEHICLE_SINGLE = 'VEHICLE_SINGLE',

  DRIVER_CREATED = 'DRIVER_CREATED',
  DRIVER_MODIFIED = 'DRIVER_MODIFIED',
  DRIVER_DELETED = 'DRIVER_DELETED',
  DRIVER_SINGLE = 'DRIVER_SINGLE',

  GROUP_CREATED = 'GROUP_CREATED',
  GROUP_MODIFIED = 'GROUP_MODIFIED',
  GROUP_DELETED = 'GROUP_DELETED',
  GROUP_SINGLE = 'GROUP_SINGLE',
}

export const AdminAPIs = createApi({
  reducerPath: "adminAPI",
  tagTypes: [
    AdminApiTags.USER_CREATED,
    AdminApiTags.USER_MODIFIED,
    AdminApiTags.USER_DELETED,
    AdminApiTags.USER_SINGLE,

    AdminApiTags.VEHICLE_CREATED,
    AdminApiTags.VEHICLE_MODIFIED,
    AdminApiTags.VEHICLE_DELETED,
    AdminApiTags.VEHICLE_SINGLE,

    AdminApiTags.DRIVER_CREATED,
    AdminApiTags.DRIVER_MODIFIED,
    AdminApiTags.DRIVER_DELETED,
    AdminApiTags.DRIVER_SINGLE,

    AdminApiTags.GROUP_CREATED,
    AdminApiTags.GROUP_MODIFIED,
    AdminApiTags.GROUP_DELETED,
    AdminApiTags.GROUP_SINGLE,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set('Authorization', `Token ${sessionStorage.getItem(sessionStorageKeys.accessToken)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({

    // roles and permissions
    organizationRolesPermissions: builder.query<ListingResponse<TUserRole[]>, void>({
      query: () => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.ROLES_PERMISSIONS,
          method: API_METHODS.GET,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<TUserRole[]>) => {
        return response
      },
    }),

    // create organization user
    createOrganizationUser: builder.mutation<CreateOrganizationUserResponse, CreateOrganizationUserPayload>({
      query: (params: CreateOrganizationUserPayload) => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.INVITE_USER,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: CreateOrganizationUserResponse) => {
        return response;
      },
    }),

    // organization users
    organizationUsers: builder.query<ListingResponse<OrganizationUser[]>, OrganizationEntityListingPayload>({
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_USERS(organization_id),
          params: {
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.USER_CREATED, AdminApiTags.USER_MODIFIED, AdminApiTags.USER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationUser[]>) => {
        return response;
      },
    }),

    // single organization user
    singleOrganizationUser: builder.query<TLoggedInUser, SingleOrganizationUserPayload>({
      query: ({ user_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_USER(user_id),
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.USER_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: TLoggedInUser) => {
        return response;
      },
    }),

    // edit organization user
    editOrganizationUser: builder.mutation<OrganizationUser, EditOrganizationUserPayload>({
      query: (params: EditOrganizationUserPayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_USER,
          method: API_METHODS.PATCH,
          body: params.data
        }
      },
      invalidatesTags: [AdminApiTags.USER_MODIFIED, AdminApiTags.USER_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationUser) => {
        return response;
      },
    }),

    // delete single user
    deleteSingleUser: builder.mutation<void, SingleOrganizationUserPayload>({
      query: ({ user_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_USER(user_id),
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: [AdminApiTags.USER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),

    // organization vehicles
    organizationVehicles: builder.query<ListingResponse<OrganizationVehicle[]>, OrganizationEntityListingPayload>({ // TODO: change the type
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_VEHICLES,
          params: {
            organization_id,
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.VEHICLE_CREATED, AdminApiTags.VEHICLE_MODIFIED, AdminApiTags.VEHICLE_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationVehicle[]>) => {
        return response;
      },
    }),

    // create organization vehicle
    createOrganizationVehicle: builder.mutation<OrganizationVehicle, CreateOrganizationVehiclePayload>({
      query: (params: CreateOrganizationVehiclePayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_VEHICLES,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.VEHICLE_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationVehicle) => {
        return response;
      },
    }),

    // single organization vehicle
    singleOrganizationVehicle: builder.query<OrganizationVehicle, SingleOrganizationVehiclePayload>({
      query: ({ organization_id, vehicle_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_VEHICLE(vehicle_id),
          params: { organization_id },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.VEHICLE_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationVehicle) => {
        return response;
      },
    }),

    //edit organization vehicle
    editOrganizationVehicle: builder.mutation<OrganizationVehicle, EditOrganizationVehiclePayload>({ // TODO: change the type
      query: ({ organization_id, vehicle_id, data}) => {
        return {
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_VEHICLE(vehicle_id),
          params: { organization_id },
          method: API_METHODS.PATCH,
          body: data
        }
      },
      invalidatesTags: [AdminApiTags.VEHICLE_MODIFIED, AdminApiTags.VEHICLE_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationVehicle) => {
        return response;
      },
    }),

    //delete organization vehicle
    deleteSingleVehicle: builder.mutation<void, SingleOrganizationVehiclePayload>({
      query: ({ organization_id, vehicle_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_VEHICLE(vehicle_id),
          params: { organization_id },
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: [AdminApiTags.VEHICLE_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),

    // organization drivers
    organizationDrivers: builder.query<ListingResponse<OrganizationDriver[]>, OrganizationEntityListingPayload>({ // TODO: change the type
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_DRIVERS,
          params: {
            organization_id,
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.DRIVER_CREATED, AdminApiTags.DRIVER_MODIFIED, AdminApiTags.DRIVER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationDriver[]>) => {
        return response;
      },
    }),

    // create organization driver
    createOrganizationDriver: builder.mutation<OrganizationDriver, CreateOrganizationDriverPayload>({
      query: (params: CreateOrganizationDriverPayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_DRIVERS,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.DRIVER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationDriver) => {
        return response;
      },
    }),

    // single organization driver
    singleOrganizationDriver: builder.query<OrganizationDriver, SingleOrganizationDriverPayload>({
      query: ({ organization_id, driver_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_DRIVER(driver_id),
          params: { organization_id },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.DRIVER_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationDriver) => {
        return response;
      },
    }),

    //edit organization driver
    editOrganizationDriver: builder.mutation<OrganizationDriver, EditOrganizationDriverPayload>({
      query: ({ organization_id, driver_id, data}) => {
        return {
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_DRIVER(driver_id),
          params: { organization_id },
          method: API_METHODS.PATCH,
          body: data
        }
      },
      invalidatesTags: [AdminApiTags.DRIVER_MODIFIED, AdminApiTags.DRIVER_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationDriver) => {
        return response;
      },
    }),

    //delete organization driver
    deleteSingleDriver: builder.mutation<void, SingleOrganizationDriverPayload>({
      query: ({ organization_id, driver_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_DRIVER(driver_id),
          params: { organization_id },
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: [AdminApiTags.DRIVER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),

    // organization groups
    organizationGroups: builder.query<ListingResponse<OrganizationGroup[]>, OrganizationEntityListingPayload>({
      query: ({organization_id, page, page_size, search}) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_GROUPS,
          params: {
            organization_id,
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.GROUP_CREATED, AdminApiTags.GROUP_MODIFIED, AdminApiTags.GROUP_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationGroup[]>) => {
        return response;
      },
    }),

    // create organization group
    createOrganizationGroup: builder.mutation<OrganizationGroup, CreateOrganizationGroupPayload>({
      query: (params: CreateOrganizationGroupPayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_GROUPS,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.GROUP_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationGroup) => {
        return response;
      },
    }),

    // single organization group
    singleOrganizationGroup: builder.query<OrganizationGroup, SingleOrganizationGroupPayload>({
      query: ({ organization_id, group_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_GROUP(group_id),
          params: { organization_id },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.GROUP_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationGroup) => {
        return response;
      },
    }),

    //edit organization group
    editOrganizationGroup: builder.mutation<OrganizationGroup, EditOrganizationGroupPayload>({
      query: ({organization_id, group_id, data}) => {
        return {
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_GROUP(group_id),
          params: { organization_id },
          method: API_METHODS.PATCH,
          body: data
        }
      },
      invalidatesTags: [AdminApiTags.GROUP_MODIFIED, AdminApiTags.GROUP_SINGLE],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationGroup) => {
        return response;
      },
    }),

    //delete organization group
    deleteSingleGroup: builder.mutation<void, SingleOrganizationGroupPayload>({
      query: ({ organization_id, group_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_GROUP(group_id),
          params: { organization_id },
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: [AdminApiTags.GROUP_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),
  }),
});

export const {
  useOrganizationRolesPermissionsQuery,
  useCreateOrganizationUserMutation,
  useOrganizationUsersQuery,
  useSingleOrganizationUserQuery,
  useEditOrganizationUserMutation,
  useDeleteSingleUserMutation,
  useOrganizationVehiclesQuery,
  useCreateOrganizationVehicleMutation,
  useSingleOrganizationVehicleQuery,
  useEditOrganizationVehicleMutation,
  useDeleteSingleVehicleMutation,
  useOrganizationDriversQuery,
  useCreateOrganizationDriverMutation,
  useSingleOrganizationDriverQuery,
  useEditOrganizationDriverMutation,
  useDeleteSingleDriverMutation,
  useOrganizationGroupsQuery,
  useCreateOrganizationGroupMutation,
  useSingleOrganizationGroupQuery,
  useEditOrganizationGroupMutation,
  useDeleteSingleGroupMutation,
} = AdminAPIs;
