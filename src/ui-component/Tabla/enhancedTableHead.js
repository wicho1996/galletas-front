import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, TextField, Checkbox, TableSortLabel } from '@mui/material';

function EnhancedTableHead(props) {
    const { classes, columns, order, orderBy, onRequestSort, filtros, DetailByrow, cambioCampo } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        // <TableRow>
        <>
            {DetailByrow != null && <TableCell padding="checkbox" />}
            {columns.map((column, ncolumna) => (
                <TableCell
                    key={`header ${column.name}`}
                    // className={classes.cabecera}
                    padding={column.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === column.name ? order : false}
                    align="center"
                >
                    {(!column.filtrar && column.label) ||
                        (typeof column.filtrar !== 'object' && (
                            <TextField
                                fullWidth
                                size="small"
                                margin="none"
                                label={column.label}
                                onChange={cambioCampo(column.name)}
                                style={{ minWidth: `${filtros.espesificos[column.name]?.length || column.name.length} em` }}
                            />
                        )) || (
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label={column.label}
                                onChange={cambioCampo(column.name)}
                                SelectProps={{ native: true }}
                                style={{ minWidth: `${filtros.espesificos[column.name]?.length || column.label.length} 'em` }}
                            >
                                <option />
                                {column.filtrar.ctl.map((opcion, index) => (
                                    <option key={index}>{opcion[column.filtrar.value]}</option>
                                ))}
                            </TextField>
                        )}
                </TableCell>
            ))}
        </>
        // </TableRow>
    );
}

EnhancedTableHead.propTypes = {
    // classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
