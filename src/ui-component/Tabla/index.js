import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { makeStyles } from '@mui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    IconButton,
    Menu,
    MenuItem,
    Checkbox,
    Collapse,
    Switch,
    lighten,
    Chip,
    TableContainer
} from '@mui/material';
import FiltradoData from '../../utils/FiltradoData';
import { MoreVert, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// import FormatNumber from '../FormatNumber';
import TopBarTable from './TopBarTable';
import EnhancedTableHead from './enhancedTableHead';
// import FechaHoraMX from 'utils/FechaHoraMX';

// const useStyles = makeStyles((theme) => ({
//     root: {},
//     filterButton: {
//         marginRight: theme.spacing(2)
//     },
//     content: {
//         padding: 0
//     },
//     inner: {
//         width: '100%'
//     },
//     actions: {
//         padding: theme.spacing(0, 1),
//         justifyContent: 'flex-end'
//     },
//     seleccionados: {
//         marginLeft: '0',
//         marginRight: 'auto'
//     },
//     rowError: {
//         backgroundColor: `${lighten(theme.palette.error.light, 0.5)} !important`
//     },
//     container: {
//         maxHeight: 440
//     },
//     row: {
//         // filter: 'blur(1px)',
//         backgroundColor: theme.palette.action.disabledBackground,
//         color: theme.palette.action.disabled,
//         pointerEvents: 'none'
//     },
//     cabecera: {
//         textTransform: 'uppercase'
//     }
// }));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const TipoCelda = ({ data, column }) => {
    switch (typeof column.type) {
        case 'undefined':
            return data[column.name] || '---';
        case 'object':
            switch (column.type.opcion) {
                // case 'date':
                //     return data[column.name] ? FechaHoraMX(data[column.name], column.type.accion) : '---';
                // case 'numero':
                //     return <FormatNumber value={data[column.name] || 0} type={column.type.accion} />;
                case 'etiqueta':
                    return (
                        <Chip
                            color="primary"
                            size="small"
                            label={data[column.name]}
                            style={typeof column.style === 'function' ? column.style(data) : column.style}
                            {...column.type.props}
                        />
                    );
                case 'switch':
                    return (
                        <Switch
                            checked={data[column.name] === '1'}
                            onChange={column.type.accion(data)}
                            disabled={column.type.disabled ? column.type.disabled(data) : false}
                            color="blue"
                        />
                    );
                default:
                    return '?';
            }
        case 'function':
            return column.type(data);
        default:
            return '?';
    }
};
const Tabla = (props) => {
    const {
        className,
        columns,
        rows,
        accionesTabla,
        accionesFila,
        accionesFilaOrientacion,
        isSeleccionable,
        columnKey,
        DetailByrow,
        widthTable,
        onError,
        toolExtra,
        filterGeneralDisabled,
        onDisabled
    } = props;

    // const classes = useStyles();
    const [filtros, setFiltros] = useState({ espesificos: {}, general: '' });
    const [anchorEl, setAnchorEl] = useState({ current: null });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataTabla, setDataTabla] = useState(rows);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // metodos de paginacion
    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    // fin paginacion
    // Columnas activas
    const columnsActivas = columns.filter((column) => !column.hidden);

    // metodos filtrado
    const dataf = FiltradoData(
        columnsActivas.map((column) => column.name),
        filtros.espesificos,
        filtros.general,
        dataTabla
    );

    const cambioCampo = (filtro) => (event) => {
        setPage(0);
        if (filtro) setFiltros({ general: filtros.general, espesificos: { ...filtros.espesificos, [filtro]: event.target.value } });
        else setFiltros({ ...filtros, general: event.target.value });
    };

    // fin filtrado
    // metodos Menu
    const abrirMenu = (row) => (event) => {
        setAnchorEl({ current: event.currentTarget, row: row });
    };

    const cerrarMenu = () => setAnchorEl({ ...anchorEl, current: null });

    // fin menu
    // metodos de selccionar
    const cambioSelccion = (rowSelected) => (event) => {
        if (isSeleccionable?.accion) isSeleccionable.accion(rowSelected, event.target.checked);
        setDataTabla(
            dataTabla.map((row) => (row[columnKey] === rowSelected[columnKey] ? { ...row, isSeleccionado: !row.isSeleccionado } : row))
        );
    };

    const cambioSelccionAll = (event) => {
        const disabled = Boolean(onDisabled);
        if (isSeleccionable?.accionAll) isSeleccionable.accionAll(event.target.checked);
        if (disabled)
            setDataTabla(dataTabla.map((row) => ({ ...row, isSeleccionado: !row.isdisabled ? event.target.checked : row.isSeleccionado })));
        else setDataTabla(dataTabla.map((row) => ({ ...row, isSeleccionado: event.target.checked })));
    };

    const seleccionados = dataf.filter((row) => row.isSeleccionado == true);
    const clickExpandir = (rowSelected) => (event) => {
        setDataTabla(dataTabla.map((row) => (row[columnKey] === rowSelected[columnKey] ? { ...row, expand: !row.expand } : row)));
    };

    const numColumns = columnsActivas.length + (DetailByrow != null) + (accionesFila.length > 0) + isSeleccionable;
    useEffect(() => {
        const disabled = Boolean(onDisabled);
        if (!disabled) setDataTabla(rows);
        else setDataTabla(rows.map((row) => ({ ...row, isdisabled: onDisabled(row) })));
    }, [rows]);

    const columnsOrden = [...columnsActivas];
    if (accionesFila.length > 0 && accionesFila.some((accion) => Boolean(accion.enabled)))
        columnsOrden.splice(accionesFilaOrientacion == 'rigth' ? columnsActivas.length : 0, 0, {
            label: ' ',
            name: 'opciones',
            disablePadding: true,
            type: (row) => (
                <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={abrirMenu(row)}>
                    <MoreVert />
                </IconButton>
            )
        });
    const dataEnbledCount = (onDisabled ? dataf.filter((row) => !row.isdisabled) : dataf).length;
    return (
        <div /* className={clsx(classes.root, className)}*/ style={{ width: widthTable }}>
            <TopBarTable
                toolExtra={toolExtra}
                data={seleccionados.length == 0 ? dataf : seleccionados}
                seleccionados={seleccionados.length}
                onChange={cambioCampo(null)}
                busquedaValue={filtros.general}
                accionesTabla={accionesTabla}
                filterGeneralDisabled={filterGeneralDisabled}
                columns={columns}
            />
            <Card>
                <CardContent /*className={classes.content}*/>
                    <PerfectScrollbar>
                        <div /*className={classes.inner}*/>
                            <TableContainer /*className={classes.container}*/>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            {isSeleccionable && (
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        indeterminate={seleccionados.length > 0 && seleccionados.length < dataEnbledCount}
                                                        checked={seleccionados.length == dataEnbledCount && seleccionados.length > 0}
                                                        onChange={cambioSelccionAll}
                                                        color="blue"
                                                    />
                                                </TableCell>
                                            )}
                                            <EnhancedTableHead
                                                columns={columnsOrden}
                                                // classes={classes}
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows.length}
                                                filtros={filtros}
                                                DetailByrow={DetailByrow}
                                                cambioSelccionAll={cambioSelccionAll}
                                                dataf={dataf}
                                                isSeleccionable={isSeleccionable}
                                                cambioCampo={cambioCampo}
                                                accionesFila={accionesFila}
                                            />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataf.length <= 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={numColumns} align="center">
                                                    <Typography variant="subtitle1">No se encuentran registros</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            stableSort(dataf, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, rowsPerPage * (page + 1))
                                                .map((data, index) => (
                                                    <React.Fragment key={'fila'.concat(index)}>
                                                        <TableRow
                                                            hover
                                                            disabled
                                                            selected={data.isSeleccionado === true}
                                                            className={clsx(
                                                                Boolean(onError) && onError(data), // && classes.rowError,
                                                                Boolean(data.isdisabled) //&& classes.row
                                                            )}
                                                        >
                                                            {isSeleccionable && (
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        onChange={cambioSelccion(data)}
                                                                        checked={data.isSeleccionado === true}
                                                                        color="blue"
                                                                    />
                                                                </TableCell>
                                                            )}
                                                            {DetailByrow != null && (
                                                                <TableCell>
                                                                    <IconButton size="small" onClick={clickExpandir(data)}>
                                                                        {data.expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                    </IconButton>
                                                                </TableCell>
                                                            )}
                                                            {columnsOrden.map((column) => (
                                                                <TableCell
                                                                    key={column.name}
                                                                    padding={column?.type?.type == 'componente' ? 'none' : 'normal'}
                                                                >
                                                                    <TipoCelda data={data} column={column} />
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                        {DetailByrow != null && (
                                                            <TableRow>
                                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={numColumns}>
                                                                    <Collapse in={data.expand}>{DetailByrow(data)}</Collapse>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </React.Fragment>
                                                ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions /*className={classes.actions}*/>
                    {seleccionados.length > 0 && (
                        <Typography variant="body2" /*className={classes.seleccionados}*/>
                            {seleccionados.length} Elementos seleccionado(s).{' '}
                        </Typography>
                    )}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'Filas por pagína'
                            },
                            native: true
                        }}
                        labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count !== -1 ? count : `more than  ${to}`}`}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardActions>
            </Card>
            {accionesFila.length > 0 && (
                <Menu anchorEl={anchorEl.current} keepMounted open={Boolean(anchorEl.current)} onClose={cerrarMenu}>
                    {accionesFila
                        .filter((accion) => (typeof accion.enabled === 'function' ? accion.enabled(anchorEl.row || {}) : accion.enabled))
                        .map((accion, index) => (
                            <MenuItem
                                key={`OpcionFila ${index}`}
                                onClick={() => {
                                    accion.onClick(anchorEl.row);
                                    cerrarMenu();
                                }}
                            >
                                {accion.label}
                            </MenuItem>
                        ))}
                </Menu>
            )}
        </div>
    );
};

Tabla.propTypes = {
    widthTable: PropTypes.string,
    onError: PropTypes.func,
    onDisabled: PropTypes.func,
    filterGeneralDisabled: PropTypes.bool,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            hidden: PropTypes.bool,
            style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
            filtrar: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                    ctl: PropTypes.arrayOf(PropTypes.object).isRequired
                }),
                PropTypes.arrayOf(PropTypes.string)
            ]),
            type: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.shape({
                    opcion: PropTypes.string.isRequired,
                    accion: PropTypes.string,
                    props: PropTypes.object
                })
            ])
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    accionesTabla: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
            click: PropTypes.func.isRequired,
            dataSelected: PropTypes.bool,
            disabled: PropTypes.bool,
            ref: PropTypes.any
        })
    ),
    accionesFilaOrientacion: PropTypes.oneOf(['left', 'rigth']),
    accionesFila: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired
        })
    ),
    isSeleccionable: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            accion: PropTypes.func.isRequired,
            accionAll: PropTypes.func.isRequired
        })
    ]),
    columnKey: PropTypes.string.isRequired,
    DetailByrow: PropTypes.func
};

Tabla.defaultProps = {
    accionesFila: [],
    accionesFilaOrientacion: 'rigth',
    accionesTabla: [],
    filterGeneralDisabled: false,
    isSeleccionable: false,
    widthTable: '100%'
};

export default Tabla;
