import React, { Fragment } from 'react';
import type { Key, VFC } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import type { FieldSet } from 'airtable';

type StationListBoxProps = {
  label: string;
  stations: FieldSet[] | undefined;
  selected: FieldSet | undefined;
  setSelected: React.Dispatch<React.SetStateAction<FieldSet | undefined>>;
};

export const StationListBox: VFC<StationListBoxProps> = ({
  label,
  stations,
  selected,
  setSelected,
}) => (
  <Listbox value={selected} onChange={setSelected}>
    <div className='relative mt-4'>
      <Listbox.Label className='font-bold'>{label}</Listbox.Label>
      <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm z-0'>
        <span className='block truncate'>{selected?.fields?.Name}</span>
        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
          <SelectorIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'>
          {stations.map((station) => (
            <Listbox.Option
              key={station.id as Key}
              className={({ active }) => `${
                active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
              }
                cursor-default select-none relative py-2 pl-10 pr-4`}
              value={station}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${
                      selected ? 'font-medium' : 'font-normal'
                    } block truncate`}
                  >
                    {station?.fields.Name}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? 'text-amber-600' : 'text-amber-600'
                      }
                      absolute inset-y-0 left-0 flex items-center pl-3`}
                    >
                      <CheckIcon className='w-5 h-5' aria-hidden='true' />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);
