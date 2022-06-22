import { Button, Icon, Tooltip } from "@canonical/react-components";
import { useSelector } from "react-redux";

import ActionBar from "app/base/components/ActionBar";
import NodeActionMenu from "app/base/components/NodeActionMenu";
import type { SetSearchFilter } from "app/base/types";
import { VMS_PER_PAGE } from "app/kvm/components/LXDVMsTable";
import type { KVMSetHeaderContent } from "app/kvm/types";
import { MachineHeaderViews } from "app/machines/constants";
import machineSelectors from "app/store/machine/selectors";
import type { Machine } from "app/store/machine/types";
import { NodeActions } from "app/store/types/node";

type Props = {
  currentPage: number;
  onAddVMClick?: () => void;
  searchFilter: string;
  setCurrentPage: (page: number) => void;
  setSearchFilter: SetSearchFilter;
  setHeaderContent: KVMSetHeaderContent;
  vms: Machine[];
};

const VMsActionBar = ({
  currentPage,
  onAddVMClick,
  searchFilter,
  setCurrentPage,
  setSearchFilter,
  setHeaderContent,
  vms,
}: Props): JSX.Element | null => {
  const loading = useSelector(machineSelectors.loading);
  const selectedMachines = useSelector(machineSelectors.selected);
  const vmActionsDisabled = selectedMachines.length === 0;

  return (
    <ActionBar
      actions={
        <>
          <NodeActionMenu
            alwaysShowLifecycle
            data-testid="vm-actions"
            disabledTooltipPosition="top-left"
            excludeActions={[NodeActions.DELETE]}
            menuPosition="left"
            nodeDisplay="VM"
            nodes={selectedMachines}
            onActionClick={(action) => {
              const view = Object.values(MachineHeaderViews).find(
                ([, actionName]) => actionName === action
              );
              if (view) {
                setHeaderContent({ view });
              }
            }}
            toggleClassName="u-no-margin--bottom"
          />
          {onAddVMClick && (
            <span className="u-nudge-right">
              <Button
                className="u-no-margin--bottom"
                data-testid="add-vm"
                hasIcon
                onClick={onAddVMClick}
              >
                <Icon name="plus" />
                <span>Add VM</span>
              </Button>
            </span>
          )}
          <Tooltip
            className="u-nudge-right"
            message={
              vmActionsDisabled
                ? "Select VMs below to perform an action."
                : null
            }
          >
            <Button
              className="u-no-margin--bottom"
              data-testid="delete-vm"
              disabled={vmActionsDisabled}
              hasIcon
              onClick={() =>
                setHeaderContent({ view: MachineHeaderViews.DELETE_MACHINE })
              }
            >
              <Icon name="delete" />
              <span>Delete VM</span>
            </Button>
          </Tooltip>
        </>
      }
      currentPage={currentPage}
      itemCount={vms.length}
      loading={loading}
      onSearchChange={setSearchFilter}
      pageSize={VMS_PER_PAGE}
      searchFilter={searchFilter}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default VMsActionBar;