import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IconButton, lighten, Tooltip, Toolbar, Typography, InputBase, Zoom, Grow, Grid, TextField } from '@mui/material';
import clsx from 'clsx';
// import ExportExcel from './ExportarExcel/Excel';
// import { makeStyles, styled } from '@mui/styles';
import { alpha, borderRadius } from '@mui/system';
import { IconSearch } from '@tabler/icons';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     // borderRadius: theme.shape.borderRadius,
//     borderRadius: '10px',
//     backgroundColor: theme.palette.blue.main,
//     // '&:hover': {
//     //     backgroundColor: alpha(theme.palette.primary.main, 0.25)
//     // },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto'
//     },
//     color: 'white'
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     borderRadius: '10px',
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     color: 'white',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.palette.blue.main
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '0',
//         color: 'white',
//         [theme.breakpoints.up('sm')]: {
//             width: '0',
//             '&:focus': {
//                 width: '20ch'
//             }
//         }
//     }
// }));
// const useStyles = makeStyles((theme) => ({
//     root: {
//         paddingTop: theme.spacing(0),
//         paddingLeft: theme.spacing(2),
//         paddingRight: theme.spacing(1)
//     },
//     highlight: {},
//     title: {
//         flex: '1 1 100%'
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         color: 'white',
//         backgroundColor: theme.palette.primary.main,
//         '&:hover': {
//             backgroundColor: theme.palette.primary.light
//         },
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(1),
//             width: 'auto'
//         }
//     },
//     searchIcon: {
//         padding: theme.spacing(0, 2),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white'
//     },
//     inputRoot: {
//         color: 'inherit'
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 0),
//         color: 'white',
//         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//         transition: theme.transitions.create('width'),
//         width: '0',
//         '&:focus': {
//             width: '20ch'
//         }
//     },
//     activo: {
//         width: '20ch'
//     },
//     iconButton: {
//         color: 'white',
//         backgroundColor: theme.palette.blue.main,
//         borderRadius: '10px',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(1),
//             width: 'auto'
//         },
//         '&:hover': {
//             backgroundColor: theme.palette.blue.light,
//             color: 'white'
//         }
//     }
// }));

const ButtonBusqueda = ({ onChange, value }) => {
    // const classes = useStyles();
    return (
        // <Search>
        //     <SearchIconWrapper>
        //         <IconSearch />
        //     </SearchIconWrapper>
        //     <StyledInputBase placeholder="" onChange={onChange} inputProps={{ 'aria-label': 'search' }} />
        // </Search>
        <div>
            <div>
                <IconSearch />
            </div>
            <InputBase placeholder="" onChange={onChange} inputProps={{ 'aria-label': 'search' }} />
        </div>
    );
};

const TopBarTable = (props) => {
    // const classes = useStyles();
    const { data, seleccionados, columnsExtra, onChange, busquedaValue, accionesTabla, toolExtra, filterGeneralDisabled, columns } = props;

    return (
        <>
            {(accionesTabla.length > 0 || !filterGeneralDisabled || Boolean(toolExtra)) && (
                <Toolbar /*className={clsx(classes.root, classes.highlight)}*/>
                    <div /*className={classes.title}*/>
                        {accionesTabla
                            .filter(
                                (accion, index) =>
                                    !accion.disabled &&
                                    ((seleccionados > 0 && accion.dataSelected) ||
                                        (seleccionados == 0 && !accion.dataSelected) ||
                                        accion.component)
                            )
                            .map((accion, index) =>
                                !accion.component ? (
                                    <Tooltip
                                        style={{ display: accion.ref ? 'none' : '' }}
                                        key={`opcionTabla ${index}`}
                                        title={accion.label}
                                    >
                                        <IconButton edge="start" color="blue" ref={accion.ref} onClick={accion.click(data)}>
                                            {accion.icon}
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <accion.component {...accion.props} />
                                )
                            )}
                        {toolExtra}
                    </div>
                    {/* {!filterGeneralDisabled && (
                        <>
                            <ExportExcel
                                data={data}
                                columns={columns}
                                fileName="archivo"
                                tipoReporte="1"
                                exportar={1}
                                // className={classes.iconButton}
                            />
                            <ButtonBusqueda onChange={onChange} value={busquedaValue} />
                        </>
                    )} */}
                </Toolbar>
            )}
        </>
    );
};

export default TopBarTable;
