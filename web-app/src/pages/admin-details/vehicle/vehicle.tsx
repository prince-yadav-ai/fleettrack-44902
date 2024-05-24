import HeaderView from "../../../components/admin/headerView";
import { FC, useEffect, useRef, useState } from "react";
import Accordian from "../../../components/accordian";
import {
  VehicleCameraIdDetailForm,
  VehicleDetailForm,
  VehicleGroupMembershipForm,
} from "./vehicle-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { useFormik } from "formik";
import {
  vehicleFormInitialValues,
  vehicleFormValidationSchema,
} from "./validation";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload, TEditOrganizationVehiclePayloadData } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import {
  useDeleteSingleVehicleMutation,
  useEditOrganizationVehicleMutation,
  useOrganizationVehiclesQuery,
  useSingleOrganizationVehicleQuery,
} from "../../../api/network/adminApiServices";
import { TListData } from "./type";
import { OrganizationVehicle } from "../../../api/types/Vehicle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";

const ScreenAdminDetailVehicle = () => {
  const { vehicleId } = useParams<{ vehicleId: any }>();
  const { state: locationState } = useLocation();
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", {
    keyPrefix: "admins.vehicles",
  });
  const { t } = useTranslation("translation", {
    keyPrefix: "admins.vehicles.detailsPage",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);

  const isNewEntity = useRef<boolean>(!!locationState?.new);
  const [userCanEdit, setUserCanEdit] = useState<boolean>(
    !!isNewEntity?.current
  );
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = useState<
    OrganizationEntityListingPayload
  >(
    (!!(locationState as OrganizationEntityListingPayload)?.organization_id
      ? locationState
      : {
          organization_id: thisUserOrganizationId,
          page: 1,
          page_size: 10,
          search: "",
          is_active: "both",
        }) as OrganizationEntityListingPayload
  );
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgVehiclesQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  const {
    data: dataOrgVehicles,
    isFetching: isFetchingOrgVehicles,
    error,
  } = useOrganizationVehiclesQuery(orgVehiclesQueryParams);
  const { results } = dataOrgVehicles || {};

  const { data: dataSingleVehicle, isFetching: isFetchingSingleVehicle, } = useSingleOrganizationVehicleQuery({ organization_id: thisUserOrganizationId, vehicle_id: vehicleId },{ skip: !vehicleId });
  const [ editOrganizationVehicleApiTrigger , {isLoading: isLoadingEditVehicle}] = useEditOrganizationVehicleMutation();
  const [ deleteSingleVehicleApiTrigger , {isLoading: isLoadingDeleteVehicle}] = useDeleteSingleVehicleMutation();
  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationVehicle[])).map(
        (item: OrganizationVehicle, index: number) => ({
          id: item?.id,
          name: item?.vehicle_model + " " + item?.vehicle_make || "-",
          description: item?.vehicle_description || "-",
          vin: item?.vin || "-",
          equipment_type: item?.euipment_type || "-",
        })
      )
    : [];

  const [formikValuesReady, setFormikValuesReady] = useState<boolean>(false);
  useEffect(() => {
    if(isFetchingSingleVehicle) {
      setFormikValuesReady(false);
    }
  }, [isFetchingSingleVehicle]);
  const formik = useFormik({
    initialValues: vehicleFormInitialValues,
    validationSchema: vehicleFormValidationSchema,
    onSubmit: (values) => {
      const data : TEditOrganizationVehiclePayloadData = {
        id: values.vehicle_id,
        asset_type: values.asset_type,
        created_at: values.creation_date,
        email: values.email,
        equipment_status: values.equipment_status,
        euipment_type: values.equipment_type,
        firmware_version: values.firmware_version,
        fuel_capacity: values.fuel_capacity,
        fuel_cost: values.fuel_cost,
        fuel_economy: values.fuel_economy,
        fuel_type: values.fuel_type,
        group_pushin_id: values.group_pushpin_id,
        ignition_input: values.ignition_input,
        imei_or_esn_number: values.imei_number,
        is_active: values.is_active,
        licence_expiry: values.license_expiration ? new Date(values.license_expiration).toISOString() : null,
        licence_plate: values.license_plate,
        map_route_color: values.map_route_color,
        maximum_speed: values.maximum_speed,
        phone: values.phone_number,
        prev_recorder_id: values.previous_recorder_id,
        prev_unique_id: values.previous_unique_id,
        recorder_id: values.recorder_id,
        recorder_id_last_changed:  values.recorder_id_last_changed ? new Date(values.recorder_id_last_changed).toISOString() : null,
        recorder_on: values.recorder_on,
        recorder_type: values.recorder_type,
        serial_number: values.serial_number,
        server_id: values.server_id,
        short_name: values.short_name,
        unique_id: values.unique_id,
        unique_id_last_change: values.unique_id_last_change ? new Date(values.unique_id_last_change).toISOString() : null,
        vehicle_class: values.vehicle_class,
        vehicle_description: values.vehicle_description,
        vehicle_make: values.vehicle_make,
        vehicle_model: values.vehicle_model,
        vin: values.vin,
        group_ids: values.list_of_groups?.map((item: any) => parseInt(item.id)) || [],
        all_vehicles: values.all_vehicles,
        driver: {
          id: values.driver_id,
          name: values.driver_name,
          phone: values.driver_phone_number,
        }
      };
      editOrganizationVehicleApiTrigger({organization_id: thisUserOrganizationId, vehicle_id: vehicleId, data})
      .unwrap()
      .then(() => {
        toast.success(t("toast.vehicle_updated"));
        navigate(routeUrls.dashboardChildren.adminChildren.vehicles);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    },
  });

  useEffect(() => {
    if (dataSingleVehicle) {
      setFormikValuesReady(false); // simulate render delay for select pre-selected values
      formik.setValues({
        vehicle_id: dataSingleVehicle?.id,
        creation_date: dataSingleVehicle?.created_at || "",
        server_id: dataSingleVehicle?.server_id || "",
        firmware_version: dataSingleVehicle?.firmware_version || "",
        unique_id: dataSingleVehicle?.unique_id || "",
        previous_unique_id: dataSingleVehicle?.prev_unique_id || "",
        unique_id_last_change: dataSingleVehicle?.unique_id_last_change || "",
        is_active: dataSingleVehicle?.is_active || false,
        vehicle_description: dataSingleVehicle?.vehicle_description || "",
        short_name: dataSingleVehicle?.short_name || "",
        vin: dataSingleVehicle?.vin || "",
        vehicle_make: dataSingleVehicle?.vehicle_make || "",
        vehicle_model: dataSingleVehicle?.vehicle_model || 0,
        license_plate: dataSingleVehicle?.licence_plate || "",
        license_expiration: dataSingleVehicle?.licence_expiry || "",
        equipment_type: dataSingleVehicle?.euipment_type || "",
        equipment_status: dataSingleVehicle?.equipment_status || "",
        asset_type: dataSingleVehicle?.asset_type || "",
        vehicle_class: dataSingleVehicle?.vehicle_class || "",
        imei_number: dataSingleVehicle?.imei_or_esn_number || 0,
        serial_number: dataSingleVehicle?.serial_number || 0,
        phone_number: dataSingleVehicle?.phone || 0,
        email: dataSingleVehicle?.email || "",
        group_pushpin_id: dataSingleVehicle?.group_pushin_id || 0,
        map_route_color: dataSingleVehicle?.map_route_color || "",
        ignition_input: dataSingleVehicle?.ignition_input || "",
        maximum_speed: dataSingleVehicle?.maximum_speed || 0,
        driver_id: dataSingleVehicle?.driver?.id || 0,
        driver_name: dataSingleVehicle?.driver?.name || "",
        driver_phone_number: dataSingleVehicle?.driver?.phone || "",
        fuel_type: dataSingleVehicle?.fuel_type || "",
        fuel_capacity: dataSingleVehicle?.fuel_capacity || 0,
        fuel_economy: dataSingleVehicle?.fuel_economy || 0,
        fuel_cost: dataSingleVehicle?.fuel_cost || 0,
        recorder_id: dataSingleVehicle?.recorder_id || "",
        recorder_on: dataSingleVehicle?.recorder_on || "",
        recorder_type: dataSingleVehicle?.recorder_type || "",
        previous_recorder_id: dataSingleVehicle?.prev_recorder_id || "",
        recorder_id_last_changed:dataSingleVehicle?.recorder_id_last_changed || "",
        list_of_groups: dataSingleVehicle?.groups || [],
        all_vehicles: dataSingleVehicle?.all_vehicles || false,
      });
      setTimeout(() => { setFormikValuesReady(true); }, 200); // simulate render delay for select pre-selected values
    }
  }, [dataSingleVehicle, vehicleId]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleDeleteVehicle = () => {
    deleteSingleVehicleApiTrigger({organization_id: thisUserOrganizationId, vehicle_id: vehicleId})
    .unwrap()
    .then(() => {
      toast.success(t("toast.vehicle_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.vehicles);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  const handleEditVehicle = () => {
    if (userCanEdit) {
      formik.handleSubmit();
    }
  };

  const handleSmsVehicle = () => {
    console.log("SMS Vehicle");
  };

  const handleCommandVehicle = () => {
    console.log("Command Vehicle");
  };
  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.vehicles)
        }
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div
            className={`hidden xl:block lg:col-span-3 space-y-4${
              isFetchingOrgVehicles ? " opacity-40 pointer-events-none" : ""
            }${isNewEntity?.current ? " xl:hidden" : ""}`}
          >
            <div className="font-bold text-lg leading-6 mt-2 mb-3">
              {t("listing_heading")}
            </div>
            <AppSearchBox
              placeholder={tAdmin("search_placeholder")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
            />
            <div>
              {listData.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                    vehicleId === item.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.vehicles}/${item.id}`
                    )
                  }
                >
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-sm leading-6 text-blue-900">
                        {item.name}
                      </p>
                      <p className="font-normal text-xs leading-6 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <div className="col-span-1 font-bold text-xs leading-4 text-right">
                      {item.equipment_type}
                    </div>
                  </div>
                  <p className="font-normal text-base leading-6 text-gray-700">
                    {item.vin}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`${
              isNewEntity?.current ? "lg:col-span-12" : "col-span-12 xl:col-span-9"
            }`}
          >
            <div className="flex items-center gap-4">
              {isNewEntity?.current ? (
                <>
                  <p className="font-semibold text-blue-900 text-base leading-6">
                    {tMain("admins.completeCreation")}
                  </p>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="submit"
                      variant="success"
                      label={tMain("save")}
                      onClick={handleEditVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="danger"
                      label={tMain("delete")}
                      onClick={() => {dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: true }))}}
                      disabled={isLoadingDeleteVehicle}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={
                        userCanEdit
                          ? handleEditVehicle
                          : () => setUserCanEdit(!userCanEdit)
                      }
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                  {/* <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={tMain("sms")}
                      onClick={handleSmsVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={tMain("command")}
                      onClick={handleCommandVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div> */}
                </>
              )}
            </div>
            <div
              className={`rounded-lg mt-2 bg-blue-200 transition ${
                isFetchingSingleVehicle || isLoadingEditVehicle
                  ? "opacity-40"
                  : ""
              }`}
            >
              <Accordian title={t("accord_details")} openByDefault={true}>
                <VehicleDetailForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={isFetchingSingleVehicle || !formikValuesReady}
                />
              </Accordian>
              <Accordian title={t("accord_camera_id")}>
                <VehicleCameraIdDetailForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={isFetchingSingleVehicle || !formikValuesReady}
                />
              </Accordian>
              <Accordian title={t("accord_group_membership")}>
                <VehicleGroupMembershipForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={isFetchingSingleVehicle || !formikValuesReady}
                />
              </Accordian>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation handleDeleteAdmin={handleDeleteVehicle} />
    </>
  );
};

export default ScreenAdminDetailVehicle;
