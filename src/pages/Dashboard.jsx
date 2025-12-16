import { useMemo, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import useTechnologies from '../useTechnologies';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Dashboard() {
  const { technologies } = useTechnologies();
  const [tabValue, setTabValue] = useState(0);

  const stats = useMemo(() => {
    const total = technologies.length;
    const completed = technologies.filter(
      (t) => t.status === 'completed'
    ).length;
    const inProgress = technologies.filter(
      (t) => t.status === 'in-progress'
    ).length;
    const notStarted = technologies.filter(
      (t) => t.status === 'not-started'
    ).length;

    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      inProgress,
      notStarted,
      completionPercentage,
    };
  }, [technologies]);

  const { completionPercentage } = stats;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* верхняя панель */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Панель управления технологиями
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* вкладки */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Разделы панели управления"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Обзор" />
        <Tab label="Статистика" />
      </Tabs>

      {/* вкладка «Обзор» */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* KPI карточки */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="h6">Завершено</Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.completed}
                </Typography>
                <Typography color="text.secondary">
                  из {stats.total} технологий
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon color="warning" />
                  <Typography variant="h6">В процессе</Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.inProgress}
                </Typography>
                <Typography color="text.secondary">
                  активные технологии
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h6">
                    Прогресс
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {completionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* списки технологий */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  В процессе
                </Typography>
                <List>
                  {technologies.map((tech) =>
                    tech.status === 'in-progress' ? (
                      <ListItem key={tech.id}>
                        <ListItemText
                          primary={tech.title}
                          secondary={tech.category}
                        />
                      </ListItem>
                    ) : null
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Не начато
                </Typography>
                <List>
                  {technologies.map((tech) =>
                    tech.status === 'not-started' ? (
                      <ListItem key={tech.id}>
                        <ListItemText
                          primary={tech.title}
                          secondary={tech.category}
                        />
                      </ListItem>
                    ) : null
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* вкладка «Статистика» */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom>
          Детальная статистика
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Общая информация
                </Typography>
                <Typography>
                  Всего технологий: {stats.total}
                </Typography>
                <Typography>
                  Завершено: {stats.completed}
                </Typography>
                <Typography>
                  В процессе: {stats.inProgress}
                </Typography>
                <Typography>
                  Не начато: {stats.notStarted}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Процент выполнения: {completionPercentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default Dashboard;
