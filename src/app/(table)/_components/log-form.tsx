"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/redux/store";
import { setLogs } from "@/components/redux/slices/logSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { fetchLogs, singleLog } from "@/components/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusCircleIcon } from "lucide-react";
import { setState } from "@/components/redux/slices/loadingSlice";

const formSchema = z.object({
  level: z.string().toLowerCase().min(1, { message: "Level is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  resourceId: z.string().min(1, { message: "Resource Id is required" }),
  timestamp: z.date(),
  traceId: z.string().min(1, { message: "Trace Id is required" }),
  spanId: z.string().min(1, { message: "Span Id is required" }),
  commit: z.string().min(1, { message: "Commit is required" }),
  metadata: z.object({
    parentResourceId: z
      .string()
      .min(1, { message: "Parent resource Id is required" }),
  }),
});

export const LogForm = () => {
  const query = useSelector((state: RootState) => state.query);
  const loadingState = useSelector((state: RootState) => state.load);
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
      message: "",
      resourceId: "",
      timestamp: new Date(),
      traceId: "",
      spanId: "",
      commit: "",
      metadata: {
        parentResourceId: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    dispatch(setState(true));
    const response = await singleLog(values);
    const logs = await fetchLogs(query);
    dispatch(setLogs(logs));
    form.reset({
      level: "",
      message: "",
      resourceId: "",
      timestamp: new Date(),
      traceId: "",
      spanId: "",
      commit: "",
      metadata: {
        parentResourceId: "",
      },
    });
    dispatch(setState(false));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="flex flex-row gap-2">
            Add
            <PlusCircleIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p className="text-3xl font-bold">Create a log</p>
            </DialogTitle>
            <DialogDescription>
              Enter log details to create a log
            </DialogDescription>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="error, info, warning..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Input placeholder="log message.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resourceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resource ID</FormLabel>
                        <FormControl>
                          <Input placeholder="server-3xduiw" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timestamp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timestamp</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={true} value={Date()} />
                        </FormControl>
                        <FormDescription>
                          Disabled by the author!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="traceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trace ID</FormLabel>
                        <FormControl>
                          <Input placeholder="QLdAVd45a" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spanId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Span ID</FormLabel>
                        <FormControl>
                          <Input placeholder="span-kbf8Kv" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="commit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commit</FormLabel>
                        <FormControl>
                          <Input placeholder="365chgi78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metadata.parentResourceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Resource ID</FormLabel>
                        <FormControl>
                          <Input placeholder="server-7Y6sdi&" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    {loadingState.loading ? (
                      <div>Creating...</div>
                    ) : (
                      <div>Submit</div>
                    )}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
