import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerHeader } from './style';
import { Page } from '../../modules/Page';

const LIST_ITEM_BUTTON_STYLE_BASIC: SxProps = {
	minHeight: 48,
	px: 2.5,
}

const LIST_ITEM_STYLE_BASIC: SxProps = { display: 'block' }

export interface NavBarProps {
	pages: Array<Page>;
}



export const NavBar = ({ pages }: NavBarProps) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate()
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
					{pages.map((page) => (
						<ListItem disablePadding sx={LIST_ITEM_STYLE_BASIC}>
							<ListItemButton
								sx={{
									...LIST_ITEM_BUTTON_STYLE_BASIC, justifyContent: open ? 'initial' : 'center',
								}}
								onClick={() => { navigate(page.route) }}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{page.icon}
								</ListItemIcon>
								<ListItemText primary={page.name} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
		</Box>
	);
}