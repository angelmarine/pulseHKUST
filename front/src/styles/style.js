// For guide text
const guideTextStyle = {
    fontSize:'16px',
    color:'#FFFFFF',
    width:'30%',
    height: '70%',
    background: '#1385e5',
    borderRadius: '7px',
    border: '5px solid #1385e5',
    boxSizing: 'border-box',
    textAlign: 'left',
    float:'right'
};

// For date picker pane
const datePickerDisplay = {
    fontSize:'24px',
    color:'#FFFFFF',
    margin: '8px 8px 20px 12px',
    padding: '12px 20px',
    width:'100%',
    background: '#1385e5',
    borderRadius: '7px',
    border: '5px solid #1385e5',
    boxSizing: 'border-box',
    textAlign: 'center'
};

const datePickerPane = {
    bmBurgerButton: {
        position: 'fixed',
        width: '170px',
        height: '60px',
        left:'47%',
        top:'85%'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#FFFFFF',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        overflow: 'manual',
        borderLeft: "5px solid #bdc3c7"
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        height: '50%'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};


// For date range pane

const dateRangeDisplay = {
    fontSize:'16px',
    color:'#FFFFFF',
    margin: '8px 8px 20px 12px',
    padding: '12px 20px',
    width:'45%',
    background: '#1385e5',
    borderRadius: '7px',
    border: '5px solid #1385e5',
    boxSizing: 'border-box',
    textAlign: 'center'
};

const dateRangePane = {
    bmBurgerButton: {
        position: 'fixed',
        width: '170px',
        height: '60px',
        left:'47%',
        top:'85%'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#FFFFFF',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        overflow: 'manual',
        borderLeft: "5px solid lightblue"
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em ',
        height: '100%'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};

const dateRangeForm = {
    position: 'fixed',
    bottom: '50%'
};


module.exports = {guideTextStyle, datePickerDisplay, datePickerPane, dateRangeDisplay, dateRangePane, dateRangeForm};