import { useRoutes } from 'react-router-dom';
import AppRouter from './AppRouter';

export default function ThemeRoutes() {
  const routeElement = useRoutes(AppRouter);
  return <>{routeElement}</>;
}
