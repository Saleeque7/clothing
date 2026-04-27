import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ AllCommunityModule ]);

/**
 * DataGrid Component
 * @param {Array} rowData - The data to display in the table
 * @param {Array} columnDefs - The definition of columns
 * @param {Object} gridOptions - Additional AG Grid options
 * @param {Boolean} loading - Shows a loading overlay
 * @param {String} [theme='ag-theme-quartz'] - Theme class name
 */
export default function DataGrid({ 
    rowData, 
    columnDefs, 
    gridOptions = {}, 
    loading = false,
    theme = 'ag-theme-quartz',
    height = '600px'
}) {
    // Default column settings
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
    }), []);

    return (
        <div className={`${theme} w-full shadow-sm rounded-2xl overflow-hidden border border-gray-100`} style={{ height }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50]}
                loading={loading}
                overlayLoadingTemplate={'<span class="ag-overlay-loading-center text-indigo-600 font-bold">Fetching latest data...</span>'}
                overlayNoRowsTemplate={'<span class="text-gray-400 font-medium">No records found</span>'}
                {...gridOptions}
            />
            
            <style dangerouslySetInnerHTML={{ __html: `
                .ag-theme-quartz {
                    --ag-grid-size: 6px;
                    --ag-border-radius: 16px;
                    --ag-header-background-color: #f8fafc;
                    --ag-header-foreground-color: #475569;
                    --ag-header-cell-hover-background-color: #f1f5f9;
                    --ag-row-hover-color: #f1f5f9;
                    --ag-selected-row-background-color: #eef2ff;
                    --ag-font-family: 'Inter', sans-serif;
                    --ag-font-size: 13px;
                }
                .ag-header-cell-label {
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                }
                .ag-cell {
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                }
            `}} />
        </div>
    );
}
