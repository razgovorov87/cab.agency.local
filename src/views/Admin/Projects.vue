<template>
  <div class="home pa-5">

    <v-card flat class="d-flex align-center mb-5">
      <div>
          <span class="title">Проекты</span>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 pt-1"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn outlined small color="#244F96">
          Сегодня: {{ date | date('monthDay') }}
      </v-btn>
    </v-card>

    <v-card>
      <ProjectsTable />
    </v-card>

  </div>
</template>

<script>
import ProjectsTable from '@/components/Admin/ProjectsTable'
export default {
  name: 'Projects',
  data: () => ({
    breadcrumbs: [
        {
            text: 'Медиан',
            disabled: true,
        },
        {
            text: 'Панель администратора',
            disabled: true,
        },
        {
            text: 'Проекты',
            disabled: false,
            href: '/admin/projects'
        },
    ],
    date: new Date()
  }),

  components: {
    ProjectsTable
  }

}
</script>
