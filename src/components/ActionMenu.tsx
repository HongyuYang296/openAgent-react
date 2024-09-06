import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo?: string;
  status: string;
  time: string;
}

interface ActionMenuProps {
  data: Data;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkVerified = () => {
    alert('Marking ' + data.firstName + ' as verified');
    handleClose();
  };

  const handleDelete = () => {
    alert('Deleting ' + data.firstName);
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="action-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {data.status === 'Inactive' && (
          <MenuItem onClick={handleMarkVerified}>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Mark as Verified" />
          </MenuItem>
        )}
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: '#d32f2f', // Standard Material-UI red for danger
            '&:hover': {
              backgroundColor: '#fdecea' // Light red on hover
            }
          }}
        >
          <ListItemIcon>
            <DeleteIcon sx={{ color: '#d32f2f' }} /> {/* Icon in danger red */}
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ActionMenu;
