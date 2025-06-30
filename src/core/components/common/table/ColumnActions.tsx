import { Column } from "./Column";

type ColumnActionsProps = {
	children: React.ReactNode;
  };
  
  export const ColumnActions = ({ children }: ColumnActionsProps) => {
	return (
	  <Column>
		<div className="flex items-center gap-2">
		  {children}
		</div>
	  </Column>
	);
  };
