import React from 'react';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

export type Channel = {
    icon: JSX.Element;
    label: string;
    value: number;
    unit: string;
};

export type Device = {
    name: string;
    data?: {
        heroValue: number;
        loadValue: number;
        battery: number;
        channels: Channel[];
    };
};

export const emptyDeviceList: Device[] = [
    {
        name: 'placeholder1',
    },
    {
        name: 'placeholder2',
    },
    {
        name: 'placeholder3',
    },
    {
        name: 'placeholder4',
    },
];

export const deviceList: Device[] = [
    {
        name: 'placeholder1',
        data: {
            heroValue: 0,
            loadValue: 20,
            battery: 12,
            channels: [
                {
                    icon: <WbSunnyIcon />,
                    label: 'Temperature',
                    value: 68,
                    unit: '°F',
                },
                {
                    icon: <BrightnessHighIcon />,
                    label: 'Output Voltage',
                    value: 480,
                    unit: 'V',
                },
                {
                    icon: <WbIncandescentIcon />,
                    label: 'Output Current',
                    value: 15,
                    unit: 'A',
                },
            ],
        },
    },
    {
        name: 'placeholder2',
        data: {
            heroValue: 100,
            loadValue: 33,
            battery: 52,
            channels: [
                {
                    icon: <WbSunnyIcon />,
                    label: 'Temperature',
                    value: 68,
                    unit: '°F',
                },
                {
                    icon: <BrightnessHighIcon />,
                    label: 'Output Voltage',
                    value: 480,
                    unit: 'V',
                },
                {
                    icon: <WbIncandescentIcon />,
                    label: 'Output Current',
                    value: 15,
                    unit: 'A',
                },
            ],
        },
    },
    {
        name: 'placeholder3',
        data: {
            heroValue: 72,
            loadValue: 98,
            battery: 98,
            channels: [
                {
                    icon: <WbSunnyIcon />,
                    label: 'Temperature',
                    value: 50,
                    unit: '°F',
                },
                {
                    icon: <BrightnessHighIcon />,
                    label: 'Output Voltage',
                    value: 680,
                    unit: 'V',
                },
                {
                    icon: <WbIncandescentIcon />,
                    label: 'Output Current',
                    value: 13,
                    unit: 'A',
                },
            ],
        },
    },
    {
        name: 'placeholder4',
        data: {
            heroValue: 54,
            loadValue: 73,
            battery: 22,
            channels: [
                {
                    icon: <WbSunnyIcon />,
                    label: 'Temperature',
                    value: 78,
                    unit: '°F',
                },
                {
                    icon: <BrightnessHighIcon />,
                    label: 'Output Voltage',
                    value: 250,
                    unit: 'V',
                },
                {
                    icon: <WbIncandescentIcon />,
                    label: 'Output Current',
                    value: 20,
                    unit: 'A',
                },
            ],
        },
    },
];
