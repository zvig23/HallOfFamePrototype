import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { SxProps, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Drawer, DrawerHeader } from './style';

const LIST_ITEM_BUTTON_STYLE_BASIC: SxProps = {
	minHeight: 48,
	px: 2.5,
}

const LIST_ITEM_STYLE_BASIC: SxProps = { display: 'block' }

export const NavBar = () => {
	const [open, setOpen] = useState(false);

	const handleDrawerClicked = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ display: 'flex', color: "#888" }}>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					{open && <Typography>Prototype Hall Of Fame</Typography>}
					<IconButton onClick={handleDrawerClicked}>
						{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem key={text} disablePadding sx={LIST_ITEM_STYLE_BASIC}>
							<ListItemButton
								sx={{
									...LIST_ITEM_BUTTON_STYLE_BASIC, justifyContent: open ? 'initial' : 'center',
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
		</Box>
	);
}