import { ApexChart } from 'ng-apexcharts';

export const DEFAULT_ANIMATION: ApexChart['animations'] = {
    enabled: true,
    easing: 'easeinout',
    speed: 500,
    animateGradually: {
        enabled: true,
        delay: 150,
    },
    dynamicAnimation: {
        enabled: true,
        speed: 350,
    },
};
