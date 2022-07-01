import { faCoffee, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, SvgIcon, Icon, colors } from '@mui/material';
import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const formato = {
    cantidad: '0.000000',
    money: '$0.00'
};

const ExportExcel = (props) => {
    const { data, columns, fileName, tipoReporte, exportar } = props;
    const multiDataSet = [
        {
            columns: columns.map((col) => ({ title: col.label, width: { wpx: 80 } })),
            data: data.map((row) =>
                columns.map((col) => ({
                    value: ['money', 'cantidad'].includes(col.type) ? Number(row[col.name]) || 0 : row[col.name] || '',
                    style: {
                        numFmt: formato[col.type]
                    }
                }))
            )
        }
    ];

    return (
        <ExcelFile
            filename={fileName}
            element={
                <Button variant="contained" className="btnExcel" color="blue" size="small">
                    <Icon color="white" component={FontAwesomeIcon} icon={faFileExcel} />
                </Button>
            }
        >
            <ExcelSheet dataSet={multiDataSet} name="Organization" />
        </ExcelFile>
    );
};

export default ExportExcel;
