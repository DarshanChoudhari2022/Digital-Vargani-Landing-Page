import React, { useState } from 'react';

export const RoleAccessSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('mandal-admin');

  const roles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      icon: 'shield_person',
      desc: 'Platform owner managing all mandals',
      color: 'blue'
    },
    {
      id: 'mandal-admin',
      name: 'Mandal Admin',
      icon: 'admin_panel_settings',
      desc: 'President / Treasurer of a specific mandal',
      color: 'orange'
    },
    {
      id: 'member',
      name: 'Collector',
      icon: 'badge',
      desc: 'Volunteer collecting vargani on the field',
      color: 'emerald'
    }
  ];

  const permissions = [
    { action: 'Create New Mandal', 'super-admin': true, 'mandal-admin': false, 'member': false },
    { action: 'Configure Receipt Template', 'super-admin': true, 'mandal-admin': true, 'member': false },
    { action: 'Add/Remove Members', 'super-admin': true, 'mandal-admin': true, 'member': false },
    { action: 'Log Mandal Expenses', 'super-admin': true, 'mandal-admin': true, 'member': false },
    { action: 'Generate Vargani Slip', 'super-admin': true, 'mandal-admin': true, 'member': true },
    { action: 'View Own Collection History', 'super-admin': true, 'mandal-admin': true, 'member': true },
    { action: 'View Total Mandal Tally', 'super-admin': true, 'mandal-admin': true, 'member': false }
  ];

  return (
    <section className="py-24 bg-white border-y border-[var(--surface-200)]">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-md text-[var(--charcoal-900)] mb-4">
            Granular access control
          </h2>
          <p className="font-body-lg text-[var(--charcoal-600)]">
            Built-in hierarchy ensures data privacy. Volunteers only see what they collect, while admins have full visibility.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Role Selector Tabs (Mobile/Tablet) */}
          <div className="flex md:hidden bg-[var(--surface-50)] p-1 rounded-xl mb-6 overflow-x-auto snap-x">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 min-w-[120px] snap-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedRole === role.id 
                    ? 'bg-white text-[var(--charcoal-900)] shadow-sm' 
                    : 'text-[var(--charcoal-600)] hover:text-[var(--charcoal-900)]'
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="bg-white border border-[var(--surface-200)] rounded-2xl saas-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[var(--surface-50)] border-b border-[var(--surface-200)]">
                    <th className="p-4 sm:p-6 w-1/3">
                      <span className="text-xs font-semibold text-[var(--charcoal-500)] uppercase tracking-wider">Permission</span>
                    </th>
                    {roles.map((role) => (
                      <th 
                        key={role.id} 
                        className={`p-4 sm:p-6 text-center ${
                          selectedRole !== role.id ? 'hidden md:table-cell' : 'table-cell'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${role.color}-50 text-${role.color}-600`}>
                            <span className="material-symbols-outlined">{role.icon}</span>
                          </div>
                          <div>
                            <div className="font-headline-sm text-[var(--charcoal-900)] text-sm sm:text-base">{role.name}</div>
                            <div className="text-[10px] sm:text-xs text-[var(--charcoal-500)] font-normal mt-0.5 max-w-[120px] mx-auto leading-tight hidden lg:block">
                              {role.desc}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--surface-100)]">
                  {permissions.map((perm, idx) => (
                    <tr key={idx} className="hover:bg-[var(--surface-50)]/50 transition-colors">
                      <td className="p-4 sm:p-6 font-body-md text-[var(--charcoal-700)]">
                        {perm.action}
                      </td>
                      {roles.map((role) => (
                        <td 
                          key={role.id} 
                          className={`p-4 sm:p-6 text-center ${
                            selectedRole !== role.id ? 'hidden md:table-cell' : 'table-cell'
                          }`}
                        >
                          {perm[role.id as keyof typeof perm] ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700">
                              <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                              <span className="material-symbols-outlined text-[14px]">remove</span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
