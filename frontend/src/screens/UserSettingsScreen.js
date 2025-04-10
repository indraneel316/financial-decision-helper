import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../contexts/AuthContext';

// Timezone list from moment-timezone
const timezones = [
    { label: 'UTC - Coordinated Universal Time', value: 'UTC' },
    { label: 'GMT - Greenwich Mean Time', value: 'GMT' },
    { label: 'EST - Eastern Standard Time', value: 'EST' },
    { label: 'EDT - Eastern Daylight Time', value: 'EDT' },
    { label: 'CST - Central Standard Time', value: 'CST' },
    { label: 'CDT - Central Daylight Time', value: 'CDT' },
    { label: 'MST - Mountain Standard Time', value: 'MST' },
    { label: 'MDT - Mountain Daylight Time', value: 'MDT' },
    { label: 'PST - Pacific Standard Time', value: 'PST' },
    { label: 'PDT - Pacific Daylight Time', value: 'PDT' },
    { label: 'IST - Indian Standard Time', value: 'IST' },
    { label: 'CET - Central European Time', value: 'CET' },
    { label: 'CEST - Central European Summer Time', value: 'CEST' },
    { label: 'JST - Japan Standard Time', value: 'JST' },
    { label: 'AEST - Australian Eastern Standard Time', value: 'AEST' },
    { label: 'AEDT - Australian Eastern Daylight Time', value: 'AEDT' },
];

// Marital status options
const maritalStatuses = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widowed', value: 'Widowed' },
    { label: 'Separated', value: 'Separated' },
];

// Full currency list (abbreviated here; use the full list from previous response)
const currencies = [
    { label: 'AED - United Arab Emirates Dirham', value: 'AED', minIncome: 2000, maxIncome: 400000 },
    { label: 'AFN - Afghan Afghani', value: 'AFN', minIncome: 5000, maxIncome: 5000000 },
    { label: 'ALL - Albanian Lek', value: 'ALL', minIncome: 20000, maxIncome: 10000000 },
    { label: 'AMD - Armenian Dram', value: 'AMD', minIncome: 50000, maxIncome: 20000000 },
    { label: 'ANG - Netherlands Antillean Guilder', value: 'ANG', minIncome: 1000, maxIncome: 200000 },
    { label: 'AOA - Angolan Kwanza', value: 'AOA', minIncome: 50000, maxIncome: 50000000 },
    { label: 'ARS - Argentine Peso', value: 'ARS', minIncome: 50000, maxIncome: 50000000 },
    { label: 'AUD - Australian Dollar', value: 'AUD', minIncome: 800, maxIncome: 150000 },
    { label: 'AWG - Aruban Florin', value: 'AWG', minIncome: 1000, maxIncome: 200000 },
    { label: 'AZN - Azerbaijani Manat', value: 'AZN', minIncome: 500, maxIncome: 100000 },
    { label: 'BAM - Bosnia-Herzegovina Convertible Mark', value: 'BAM', minIncome: 500, maxIncome: 100000 },
    { label: 'BBD - Barbadian Dollar', value: 'BBD', minIncome: 1000, maxIncome: 200000 },
    { label: 'BDT - Bangladeshi Taka', value: 'BDT', minIncome: 10000, maxIncome: 10000000 },
    { label: 'BGN - Bulgarian Lev', value: 'BGN', minIncome: 500, maxIncome: 100000 },
    { label: 'BHD - Bahraini Dinar', value: 'BHD', minIncome: 200, maxIncome: 50000 },
    { label: 'BIF - Burundian Franc', value: 'BIF', minIncome: 500000, maxIncome: 500000000 },
    { label: 'BMD - Bermudian Dollar', value: 'BMD', minIncome: 500, maxIncome: 100000 },
    { label: 'BND - Brunei Dollar', value: 'BND', minIncome: 700, maxIncome: 120000 },
    { label: 'BOB - Bolivian Boliviano', value: 'BOB', minIncome: 2000, maxIncome: 2000000 },
    { label: 'BRL - Brazilian Real', value: 'BRL', minIncome: 2000, maxIncome: 500000 },
    { label: 'BSD - Bahamian Dollar', value: 'BSD', minIncome: 500, maxIncome: 100000 },
    { label: 'BTN - Bhutanese Ngultrum', value: 'BTN', minIncome: 10000, maxIncome: 10000000 },
    { label: 'BWP - Botswanan Pula', value: 'BWP', minIncome: 2000, maxIncome: 2000000 },
    { label: 'BYN - Belarusian Ruble', value: 'BYN', minIncome: 500, maxIncome: 100000 },
    { label: 'BZD - Belize Dollar', value: 'BZD', minIncome: 1000, maxIncome: 200000 },
    { label: 'CAD - Canadian Dollar', value: 'CAD', minIncome: 700, maxIncome: 120000 },
    { label: 'CDF - Congolese Franc', value: 'CDF', minIncome: 500000, maxIncome: 500000000 },
    { label: 'CHF - Swiss Franc', value: 'CHF', minIncome: 800, maxIncome: 150000 },
    { label: 'CLP - Chilean Peso', value: 'CLP', minIncome: 200000, maxIncome: 200000000 },
    { label: 'CNY - Chinese Yuan', value: 'CNY', minIncome: 3000, maxIncome: 500000 },
    { label: 'COP - Colombian Peso', value: 'COP', minIncome: 1000000, maxIncome: 1000000000 },
    { label: 'CRC - Costa Rican Colón', value: 'CRC', minIncome: 200000, maxIncome: 200000000 },
    { label: 'CUP - Cuban Peso', value: 'CUP', minIncome: 500, maxIncome: 500000 },
    { label: 'CVE - Cape Verdean Escudo', value: 'CVE', minIncome: 20000, maxIncome: 20000000 },
    { label: 'CZK - Czech Koruna', value: 'CZK', minIncome: 10000, maxIncome: 5000000 },
    { label: 'DJF - Djiboutian Franc', value: 'DJF', minIncome: 50000, maxIncome: 50000000 },
    { label: 'DKK - Danish Krone', value: 'DKK', minIncome: 5000, maxIncome: 1000000 },
    { label: 'DOP - Dominican Peso', value: 'DOP', minIncome: 10000, maxIncome: 10000000 },
    { label: 'DZD - Algerian Dinar', value: 'DZD', minIncome: 50000, maxIncome: 50000000 },
    { label: 'EGP - Egyptian Pound', value: 'EGP', minIncome: 5000, maxIncome: 5000000 },
    { label: 'ERN - Eritrean Nakfa', value: 'ERN', minIncome: 2000, maxIncome: 2000000 },
    { label: 'ETB - Ethiopian Birr', value: 'ETB', minIncome: 5000, maxIncome: 5000000 },
    { label: 'EUR - Euro', value: 'EUR', minIncome: 500, maxIncome: 100000 },
    { label: 'FJD - Fijian Dollar', value: 'FJD', minIncome: 1000, maxIncome: 200000 },
    { label: 'FKP - Falkland Islands Pound', value: 'FKP', minIncome: 400, maxIncome: 80000 },
    { label: 'GBP - British Pound', value: 'GBP', minIncome: 400, maxIncome: 80000 },
    { label: 'GEL - Georgian Lari', value: 'GEL', minIncome: 1000, maxIncome: 200000 },
    { label: 'GHS - Ghanaian Cedi', value: 'GHS', minIncome: 1000, maxIncome: 1000000 },
    { label: 'GIP - Gibraltar Pound', value: 'GIP', minIncome: 400, maxIncome: 80000 },
    { label: 'GMD - Gambian Dalasi', value: 'GMD', minIncome: 5000, maxIncome: 5000000 },
    { label: 'GNF - Guinean Franc', value: 'GNF', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'GTQ - Guatemalan Quetzal', value: 'GTQ', minIncome: 2000, maxIncome: 2000000 },
    { label: 'GYD - Guyanaese Dollar', value: 'GYD', minIncome: 50000, maxIncome: 50000000 },
    { label: 'HKD - Hong Kong Dollar', value: 'HKD', minIncome: 4000, maxIncome: 800000 },
    { label: 'HNL - Honduran Lempira', value: 'HNL', minIncome: 5000, maxIncome: 5000000 },
    { label: 'HRK - Croatian Kuna', value: 'HRK', minIncome: 3000, maxIncome: 600000 },
    { label: 'HTG - Haitian Gourde', value: 'HTG', minIncome: 10000, maxIncome: 10000000 },
    { label: 'HUF - Hungarian Forint', value: 'HUF', minIncome: 100000, maxIncome: 100000000 },
    { label: 'IDR - Indonesian Rupiah', value: 'IDR', minIncome: 2000000, maxIncome: 2000000000 },
    { label: 'ILS - Israeli New Shekel', value: 'ILS', minIncome: 2000, maxIncome: 400000 },
    { label: 'INR - Indian Rupee', value: 'INR', minIncome: 10000, maxIncome: 10000000 },
    { label: 'IQD - Iraqi Dinar', value: 'IQD', minIncome: 500000, maxIncome: 500000000 },
    { label: 'IRR - Iranian Rial', value: 'IRR', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'ISK - Icelandic Króna', value: 'ISK', minIncome: 50000, maxIncome: 50000000 },
    { label: 'JMD - Jamaican Dollar', value: 'JMD', minIncome: 50000, maxIncome: 50000000 },
    { label: 'JOD - Jordanian Dinar', value: 'JOD', minIncome: 200, maxIncome: 50000 },
    { label: 'JPY - Japanese Yen', value: 'JPY', minIncome: 50000, maxIncome: 10000000 },
    { label: 'KES - Kenyan Shilling', value: 'KES', minIncome: 10000, maxIncome: 10000000 },
    { label: 'KGS - Kyrgystani Som', value: 'KGS', minIncome: 10000, maxIncome: 10000000 },
    { label: 'KHR - Cambodian Riel', value: 'KHR', minIncome: 500000, maxIncome: 500000000 },
    { label: 'KMF - Comorian Franc', value: 'KMF', minIncome: 100000, maxIncome: 100000000 },
    { label: 'KPW - North Korean Won', value: 'KPW', minIncome: 50000, maxIncome: 50000000 },
    { label: 'KRW - South Korean Won', value: 'KRW', minIncome: 500000, maxIncome: 100000000 },
    { label: 'KWD - Kuwaiti Dinar', value: 'KWD', minIncome: 150, maxIncome: 30000 },
    { label: 'KYD - Cayman Islands Dollar', value: 'KYD', minIncome: 500, maxIncome: 100000 },
    { label: 'KZT - Kazakhstani Tenge', value: 'KZT', minIncome: 100000, maxIncome: 100000000 },
    { label: 'LAK - Laotian Kip', value: 'LAK', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'LBP - Lebanese Pound', value: 'LBP', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'LKR - Sri Lankan Rupee', value: 'LKR', minIncome: 50000, maxIncome: 50000000 },
    { label: 'LRD - Liberian Dollar', value: 'LRD', minIncome: 10000, maxIncome: 10000000 },
    { label: 'LSL - Lesotho Loti', value: 'LSL', minIncome: 2000, maxIncome: 2000000 },
    { label: 'LYD - Libyan Dinar', value: 'LYD', minIncome: 500, maxIncome: 100000 },
    { label: 'MAD - Moroccan Dirham', value: 'MAD', minIncome: 2000, maxIncome: 2000000 },
    { label: 'MDL - Moldovan Leu', value: 'MDL', minIncome: 5000, maxIncome: 5000000 },
    { label: 'MGA - Malagasy Ariary', value: 'MGA', minIncome: 500000, maxIncome: 500000000 },
    { label: 'MKD - Macedonian Denar', value: 'MKD', minIncome: 10000, maxIncome: 10000000 },
    { label: 'MMK - Myanma Kyat', value: 'MMK', minIncome: 500000, maxIncome: 500000000 },
    { label: 'MNT - Mongolian Tugrik', value: 'MNT', minIncome: 500000, maxIncome: 500000000 },
    { label: 'MOP - Macanese Pataca', value: 'MOP', minIncome: 4000, maxIncome: 800000 },
    { label: 'MRU - Mauritanian Ouguiya', value: 'MRU', minIncome: 10000, maxIncome: 10000000 },
    { label: 'MUR - Mauritian Rupee', value: 'MUR', minIncome: 10000, maxIncome: 10000000 },
    { label: 'MVR - Maldivian Rufiyaa', value: 'MVR', minIncome: 2000, maxIncome: 2000000 },
    { label: 'MWK - Malawian Kwacha', value: 'MWK', minIncome: 500000, maxIncome: 500000000 },
    { label: 'MXN - Mexican Peso', value: 'MXN', minIncome: 5000, maxIncome: 5000000 },
    { label: 'MYR - Malaysian Ringgit', value: 'MYR', minIncome: 2000, maxIncome: 400000 },
    { label: 'MZN - Mozambican Metical', value: 'MZN', minIncome: 10000, maxIncome: 10000000 },
    { label: 'NAD - Namibian Dollar', value: 'NAD', minIncome: 2000, maxIncome: 2000000 },
    { label: 'NGN - Nigerian Naira', value: 'NGN', minIncome: 100000, maxIncome: 100000000 },
    { label: 'NIO - Nicaraguan Córdoba', value: 'NIO', minIncome: 10000, maxIncome: 10000000 },
    { label: 'NOK - Norwegian Krone', value: 'NOK', minIncome: 5000, maxIncome: 1000000 },
    { label: 'NPR - Nepalese Rupee', value: 'NPR', minIncome: 10000, maxIncome: 10000000 },
    { label: 'NZD - New Zealand Dollar', value: 'NZD', minIncome: 800, maxIncome: 150000 },
    { label: 'OMR - Omani Rial', value: 'OMR', minIncome: 200, maxIncome: 50000 },
    { label: 'PAB - Panamanian Balboa', value: 'PAB', minIncome: 500, maxIncome: 100000 },
    { label: 'PEN - Peruvian Sol', value: 'PEN', minIncome: 1000, maxIncome: 1000000 },
    { label: 'PGK - Papua New Guinean Kina', value: 'PGK', minIncome: 1000, maxIncome: 1000000 },
    { label: 'PHP - Philippine Peso', value: 'PHP', minIncome: 10000, maxIncome: 10000000 },
    { label: 'PKR - Pakistani Rupee', value: 'PKR', minIncome: 50000, maxIncome: 50000000 },
    { label: 'PLN - Polish Zloty', value: 'PLN', minIncome: 2000, maxIncome: 400000 },
    { label: 'PYG - Paraguayan Guarani', value: 'PYG', minIncome: 2000000, maxIncome: 2000000000 },
    { label: 'QAR - Qatari Rial', value: 'QAR', minIncome: 2000, maxIncome: 400000 },
    { label: 'RON - Romanian Leu', value: 'RON', minIncome: 2000, maxIncome: 400000 },
    { label: 'RSD - Serbian Dinar', value: 'RSD', minIncome: 50000, maxIncome: 50000000 },
    { label: 'RUB - Russian Ruble', value: 'RUB', minIncome: 20000, maxIncome: 20000000 },
    { label: 'RWF - Rwandan Franc', value: 'RWF', minIncome: 500000, maxIncome: 500000000 },
    { label: 'SAR - Saudi Riyal', value: 'SAR', minIncome: 2000, maxIncome: 400000 },
    { label: 'SBD - Solomon Islands Dollar', value: 'SBD', minIncome: 2000, maxIncome: 2000000 },
    { label: 'SCR - Seychellois Rupee', value: 'SCR', minIncome: 5000, maxIncome: 5000000 },
    { label: 'SDG - Sudanese Pound', value: 'SDG', minIncome: 500000, maxIncome: 500000000 },
    { label: 'SEK - Swedish Krona', value: 'SEK', minIncome: 5000, maxIncome: 1000000 },
    { label: 'SGD - Singapore Dollar', value: 'SGD', minIncome: 1000, maxIncome: 200000 },
    { label: 'SHP - Saint Helena Pound', value: 'SHP', minIncome: 400, maxIncome: 80000 },
    { label: 'SLL - Sierra Leonean Leone', value: 'SLL', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'SOS - Somali Shilling', value: 'SOS', minIncome: 500000, maxIncome: 500000000 },
    { label: 'SRD - Surinamese Dollar', value: 'SRD', minIncome: 5000, maxIncome: 5000000 },
    { label: 'SSP - South Sudanese Pound', value: 'SSP', minIncome: 50000, maxIncome: 50000000 },
    { label: 'STN - São Tomé and Príncipe Dobra', value: 'STN', minIncome: 10000, maxIncome: 10000000 },
    { label: 'SYP - Syrian Pound', value: 'SYP', minIncome: 500000, maxIncome: 500000000 },
    { label: 'SZL - Swazi Lilangeni', value: 'SZL', minIncome: 2000, maxIncome: 2000000 },
    { label: 'THB - Thai Baht', value: 'THB', minIncome: 10000, maxIncome: 10000000 },
    { label: 'TJS - Tajikistani Somoni', value: 'TJS', minIncome: 1000, maxIncome: 1000000 },
    { label: 'TMT - Turkmenistani Manat', value: 'TMT', minIncome: 1000, maxIncome: 1000000 },
    { label: 'TND - Tunisian Dinar', value: 'TND', minIncome: 500, maxIncome: 100000 },
    { label: 'TOP - Tongan Paʻanga', value: 'TOP', minIncome: 1000, maxIncome: 1000000 },
    { label: 'TRY - Turkish Lira', value: 'TRY', minIncome: 5000, maxIncome: 5000000 },
    { label: 'TTD - Trinidad and Tobago Dollar', value: 'TTD', minIncome: 2000, maxIncome: 2000000 },
    { label: 'TWD - New Taiwan Dollar', value: 'TWD', minIncome: 10000, maxIncome: 10000000 },
    { label: 'TZS - Tanzanian Shilling', value: 'TZS', minIncome: 500000, maxIncome: 500000000 },
    { label: 'UAH - Ukrainian Hryvnia', value: 'UAH', minIncome: 10000, maxIncome: 10000000 },
    { label: 'UGX - Ugandan Shilling', value: 'UGX', minIncome: 500000, maxIncome: 500000000 },
    { label: 'USD - US Dollar', value: 'USD', minIncome: 500, maxIncome: 100000 },
    { label: 'UYU - Uruguayan Peso', value: 'UYU', minIncome: 10000, maxIncome: 10000000 },
    { label: 'UZS - Uzbekistan Som', value: 'UZS', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'VES - Venezuelan Bolívar', value: 'VES', minIncome: 1000, maxIncome: 1000000 },
    { label: 'VND - Vietnamese Dong', value: 'VND', minIncome: 5000000, maxIncome: 5000000000 },
    { label: 'VUV - Vanuatu Vatu', value: 'VUV', minIncome: 50000, maxIncome: 50000000 },
    { label: 'WST - Samoan Tala', value: 'WST', minIncome: 1000, maxIncome: 1000000 },
    { label: 'XAF - Central African CFA Franc', value: 'XAF', minIncome: 100000, maxIncome: 100000000 },
    { label: 'XCD - East Caribbean Dollar', value: 'XCD', minIncome: 1000, maxIncome: 1000000 },
    { label: 'XOF - West African CFA Franc', value: 'XOF', minIncome: 100000, maxIncome: 100000000 },
    { label: 'XPF - CFP Franc', value: 'XPF', minIncome: 50000, maxIncome: 50000000 },
    { label: 'YER - Yemeni Rial', value: 'YER', minIncome: 500000, maxIncome: 500000000 },
    { label: 'ZAR - South African Rand', value: 'ZAR', minIncome: 5000, maxIncome: 5000000 },
    { label: 'ZMW - Zambian Kwacha', value: 'ZMW', minIncome: 5000, maxIncome: 5000000 },
    { label: 'ZWL - Zimbabwean Dollar', value: 'ZWL', minIncome: 50000, maxIncome: 50000000 },
];

const UserSettingsScreen = ({ navigation }) => {
    const { user, token, updateProfile } = useAuth();
    const [settings, setSettings] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log('UserSettingsScreen - User from AuthContext:', user);
        if (user) {
            const newSettings = {
                email: user.email || '',
                age: user.age || '',
                monthlyIncomeLevel: user.incomeLevel || 0,
                occupationLevel: user.occupationLevel || '',
                maritalStatus: user.maritalStatus || 'Single',
                familySize: user.familySize || 1,
                timeZone: user.timeZone || 'UTC',
                currency: user.currency || 'USD',
                psychologicalNotes: user.psychologicalNotes || '',
            };
            setSettings(newSettings);
            console.log('UserSettingsScreen - Settings set:', newSettings);
        }
    }, [user]);

    const handleChange = (field, value) => {
        if (settings) setSettings({ ...settings, [field]: value });
    };

    const validateInputs = () => {
        const ageNum = parseInt(settings.age, 10);
        const incomeNum = parseInt(settings.monthlyIncomeLevel, 10);
        const selectedCurrency = currencies.find((c) => c.value === settings.currency);
        const validTimeZone = timezones.some((tz) => tz.value === settings.timeZone);
        const validMaritalStatus = maritalStatuses.some((ms) => ms.value === settings.maritalStatus);

        if (isEditing) {
            if (settings.age && (isNaN(ageNum) || ageNum < 12 || ageNum > 90)) {
                Alert.alert('Error', 'Age must be between 12 and 90');
                return false;
            }
            if (
                settings.monthlyIncomeLevel &&
                (isNaN(incomeNum) ||
                    incomeNum < selectedCurrency.minIncome ||
                    incomeNum > selectedCurrency.maxIncome)
            ) {
                Alert.alert(
                    'Error',
                    `Monthly income must be between ${selectedCurrency.minIncome.toLocaleString()} and ${selectedCurrency.maxIncome.toLocaleString()} ${settings.currency}`
                );
                return false;
            }
            if (!validTimeZone) {
                Alert.alert('Error', 'Please select a valid timezone');
                return false;
            }
            if (!validMaritalStatus) {
                Alert.alert('Error', 'Please select a valid marital status');
                return false;
            }
        }
        return true;
    };

    const handleSave = async () => {
        if (!user || !token) {
            Alert.alert('Error', 'You must be logged in to update settings');
            return;
        }

        if (!validateInputs()) return;

        try {
            const updatedData = {
                email: settings.email,
                age: settings.age ? parseInt(settings.age, 10) : null,
                incomeLevel: parseInt(settings.monthlyIncomeLevel, 10) || 0,
                occupationLevel: settings.occupationLevel,
                maritalStatus: settings.maritalStatus,
                familySize: parseInt(settings.familySize, 10) || 1,
                timeZone: settings.timeZone,
                currency: settings.currency,
                psychologicalNotes: settings.psychologicalNotes,
            };

            const updatedUser = await updateProfile(updatedData);
            console.log('UserSettingsScreen - Updated user from backend:', updatedUser);
            setSettings((prev) => ({
                ...prev,
                email: updatedUser.email || prev.email || '',
                age: updatedUser.age || prev.age || '',
                monthlyIncomeLevel: updatedUser.incomeLevel || prev.monthlyIncomeLevel || 0,
                occupationLevel: updatedUser.occupationLevel || prev.occupationLevel || '',
                maritalStatus: updatedUser.maritalStatus || prev.maritalStatus || 'Single',
                familySize: updatedUser.familySize || prev.familySize || 1,
                timeZone: updatedUser.timeZone || prev.timeZone || 'UTC',
                currency: updatedUser.currency || prev.currency || 'USD',
                psychologicalNotes: updatedUser.psychologicalNotes || prev.psychologicalNotes || '',
            }));
            setIsEditing(false);
            Alert.alert('Success', 'Settings updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update settings');
        }
    };

    if (!settings) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text>Loading user settings...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>User Settings</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        if (isEditing && user) {
                            setSettings({
                                email: user.email || '',
                                age: user.age || '',
                                monthlyIncomeLevel: user.incomeLevel || 0,
                                occupationLevel: user.occupationLevel || '',
                                maritalStatus: user.maritalStatus || 'Single',
                                familySize: user.familySize || 1,
                                timeZone: user.timeZone || 'UTC',
                                currency: user.currency || 'USD',
                                psychologicalNotes: user.psychologicalNotes || '',
                            });
                        }
                        setIsEditing(!isEditing);
                    }}
                >
                    <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Personal Information Section */}
                <View style={styles.settingsCard}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.email}
                                onChangeText={(text) => handleChange('email', text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <Text style={styles.value}>{settings.email}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Age</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.age ? settings.age.toString() : ''}
                                onChangeText={(text) => handleChange('age', text)}
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={styles.value}>{settings.age || 'Not set'}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Occupation</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.occupationLevel}
                                onChangeText={(text) => handleChange('occupationLevel', text)}
                            />
                        ) : (
                            <Text style={styles.value}>{settings.occupationLevel || 'Not set'}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Marital Status</Text>
                        {isEditing ? (
                            <Picker
                                selectedValue={settings.maritalStatus}
                                onValueChange={(itemValue) => handleChange('maritalStatus', itemValue)}
                                style={styles.picker}
                            >
                                {maritalStatuses.map((status) => (
                                    <Picker.Item
                                        key={status.value}
                                        label={status.label}
                                        value={status.value}
                                    />
                                ))}
                            </Picker>
                        ) : (
                            <Text style={styles.value}>{settings.maritalStatus || 'Not set'}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Family Size</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.familySize.toString()}
                                onChangeText={(text) => handleChange('familySize', text)}
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={styles.value}>{settings.familySize}</Text>
                        )}
                    </View>
                </View>

                {/* Financial Information Section */}
                <View style={styles.settingsCard}>
                    <Text style={styles.sectionTitle}>Financial Information</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Monthly Income Level</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.monthlyIncomeLevel.toString()}
                                onChangeText={(text) => handleChange('monthlyIncomeLevel', text)}
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={styles.value}>
                                {settings.currency} {settings.monthlyIncomeLevel.toLocaleString()}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Currency</Text>
                        {isEditing ? (
                            <RNPickerSelect
                                onValueChange={(value) => handleChange('currency', value)}
                                items={currencies}
                                value={settings.currency}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'Select a currency...', value: null }}
                                useNativeAndroidPickerStyle={false} // For custom styling
                            />
                        ) : (
                            <Text style={styles.value}>{settings.currency}</Text>
                        )}
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.settingsCard}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Time Zone</Text>
                        {isEditing ? (
                            <RNPickerSelect
                                onValueChange={(value) => handleChange('timeZone', value)}
                                items={timezones}
                                value={settings.timeZone}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'Select a timezone...', value: null }}
                                useNativeAndroidPickerStyle={false}
                            />
                        ) : (
                            <Text style={styles.value}>{settings.timeZone}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Psychological Notes</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={settings.psychologicalNotes}
                                onChangeText={(text) => handleChange('psychologicalNotes', text)}
                                multiline
                                numberOfLines={3}
                            />
                        ) : (
                            <Text style={styles.value}>{settings.psychologicalNotes || 'None'}</Text>
                        )}
                    </View>
                </View>

                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#FFF',
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    settingsCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
        color: '#333',
    },
    picker: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
        color: '#333',
    },
    inputAndroid: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
        color: '#333',
    },
    placeholder: {
        color: '#999',
    },
});

export default UserSettingsScreen;