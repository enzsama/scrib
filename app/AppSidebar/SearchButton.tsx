import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search className="hover:text-gray-900 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Project</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="items-center gap-4">
            <Input id="search" className="col-span-3" />
          </div>
        </div>
        <div>
          {/* Recent searches */}
          <DialogDescription>Recent</DialogDescription>
        </div>
        <DialogFooter>
          <Button type="submit">Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
