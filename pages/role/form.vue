<script setup>
import { mdiArrowLeft, mdiShield } from '@mdi/js';

const config = useRuntimeConfig();
const route = useRoute();
const title = ref('Create Role');
const loading = ref(false);

const { data: permissions } = await useApi(`${config.public.apiBase}/api/v1/role/permission`);


onMounted(async () => {
    if (route.query.id) {
        getUpdateData();
        title.value = 'Update Role';
    }
})

const payload = ref({
    name: null,
    permissions_id: [1, 2],
    is_active: 1,
});

const formError = ref({});

const statusList = ref([
    {
        id: 1,
        label: 'Active'
    },
    {
        id: 2,
        label: 'Inactive'
    },
]);

async function submit() {
    payload.value.permissions_id = getCheckedPermission();
    loading.value = true;
    const { data, pending, error, refresh } = await useApi(`${config.public.apiBase}/api/v1/role`, {
        method: 'post',
        body: {
            name: payload.value.name,
            permissions: payload.value.permissions_id
        },
    });
    loading.value = pending.value;
    if (data.value) {
        console.log(data.value);
        useToast({ title: data.value.message });
    } else {
        formError.value = get422Error(error);
        useToast({ title: error.value.data.message, type: 'error' });
    }
}

function getCheckedPermission() {
    let results = [];
    permissions.value.data.forEach((element) => {
        if (element["view"]) {
            if (element["view"]["value"] == true) {
                results.push(element["view"]["id"]);
            }
        }
        if (element["create"]) {
            if (element["create"]["value"] == true) {
                results.push(element["create"]["id"]);
            }
        }
        if (element["update"]) {
            if (element["update"]["value"] == true) {
                results.push(element["update"]["id"]);
            }
        }
        if (element["delete"]) {
            if (element["delete"]["value"] == true) {
                results.push(element["delete"]["id"]);
            }
        }
        if (element["download"]) {
            if (element["download"]["value"] == true) {
                results.push(element["download"]["id"]);
            }
        }
    });
    return results;
}

async function getUpdateData() {

    const { data: roleItem } = await useApi(`${config.public.apiBase}/api/v1/role/show/10`);
    const { data: updatedData, pending, error, refresh } = await useApi(`${config.public.apiBase}/api/v1/role/show/${route.query.id}`);
    refresh();
    console.log(updatedData);
    if (updatedData.value) {
        payload.value.name = updatedData.value.data.name;
        updatedData.value.data.permissions.forEach((element) => {
            console.log(element);
            payload.value.permissions_id.push(element.id);
        });
        console.log('payload update', payload.value);
        setCheckedPermission();
    }

}

function setCheckedPermission() {
    permissions.value.data.forEach((element, index) => {
        if (element["view"]) {
            if (payload.value.permissions_id.includes(element["view"]["id"])) {
                permissions.value.data[index]["view"]["value"] = true;
            }
        }
        if (element["create"]) {
            if (payload.value.permissions_id.includes(element["create"]["id"])) {
                permissions.value.data[index]["create"]["value"] = true;
            }
        }
        if (element["update"]) {
            if (payload.value.permissions_id.includes(element["update"]["id"])) {
                permissions.value.data[index]["update"]["value"] = true;
            }
        }
        if (element["delete"]) {
            if (payload.value.permissions_id.includes(element["delete"]["id"])) {
                permissions.value.data[index]["delete"]["value"] = true;
            }
        }
        if (element["download"]) {
            if (payload.value.permissions_id.includes(element["download"]["id"])) {
                permissions.value.data[index]["download"]["value"] = true;
            }
        }
    });
}
</script>

<template>
    <div>
        <NuxtLayout name="authenticated">
            <SectionMain>

                <SectionTitleLineWithButton :icon="mdiShield" :title="title" main>
                    <BaseButton :to="'/role'" :icon="mdiArrowLeft" label="Back" color="contrast" rounded-full small />
                </SectionTitleLineWithButton>

                <CardBox :class="cardClass" is-form @submit.prevent="submit">
                    <FormField label="Role Name" help="Please enter role name" :error="formError['name']">
                        <FormControl v-model="payload.name" name="name" autocomplete="name" />
                    </FormField>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-left" scope="col">Modul</th>
                                <th class="text-center" scope="col">View</th>
                                <th class="text-center" scope="col">Create</th>
                                <th class="text-center" scope="col">Update</th>
                                <th class="text-center" scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody v-if="!permissions">
                            <!-- <table-shimmer :column="5" :row="10"></table-shimmer> -->
                        </tbody>
                        <tbody v-else>
                            <tr v-for="(item, index) in permissions.data" :key="index">
                                <th class="text-capitalize" scope="row">{{ item["module"] }}</th>
                                <td class="text-center">
                                    <FormCheckRadio v-if="permissions.data[index]['view']"
                                        v-model="permissions.data[index]['view']['value']" :input-value="true" />
                                </td>
                                <td class="text-center">
                                    <FormCheckRadio v-if="permissions.data[index]['create']"
                                        v-model="permissions.data[index]['create']['value']" :input-value="true" />
                                </td>
                                <td class="text-center">
                                    <FormCheckRadio v-if="permissions.data[index]['update']"
                                        v-model="permissions.data[index]['update']['value']" :input-value="true" />
                                </td>
                                <td class="text-center">
                                    <FormCheckRadio v-if="permissions.data[index]['delete']"
                                        v-model="permissions.data[index]['delete']['value']" :input-value="true" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <template #footer>
                        <BaseButtons>
                            <BaseButton to="/" color="info" outline label="Back" />
                            <BaseButton type="submit" color="info" :label="loading ? 'Loading...' : 'Submit'" />
                        </BaseButtons>
                    </template>
                </CardBox>
            </SectionMain>
        </NuxtLayout>
    </div>
</template>
