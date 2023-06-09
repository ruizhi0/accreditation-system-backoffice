export default {
  sendReminderEmailToFacultyWithExpiringAccreditation: {
    task: async ({ strapi }) => {
      console.log(
        `[CRON - Send reminder email to faculty with expiring accreditation]`
      );

      const today = new Date();
      const expiringDate = new Date(new Date().setDate(today.getDate() - 30));

      const accreditations = await strapi.entityService.findMany(
        "api::accreditation.accreditation",
        {
          populate: {
            academic_programme: {
              populate: {
                faculty: true,
              },
            },
          },
          filters: {
            expiry_date: { $lte: expiringDate.toISOString().split("T")[0] },
          },
        }
      );

      const expiringAccreditations = accreditations.filter(
        (x: { expiry_date: string }) => new Date(x.expiry_date) <= expiringDate
      );

      const groups = expiringAccreditations.reduce((groups, item) => {
        const group = groups[item.academic_programme.faculty.email] || [];
        group.push(item);
        groups[item.academic_programme.faculty.email] = group;
        return groups;
      }, {});

      const targets = [];
      for (const email in groups) {
        const expiringAccreditations = groups[email];
        const details = expiringAccreditations.map((x) => {
          return {
            academic_programme: x.academic_programme.name,
            accreditation_type: x.type,
            expiry_date: x.expiry_date,
          };
        });

        targets.push({
          email: email,
          details: details,
        });
      }
      console.log("targets", JSON.stringify(targets));

      for (const target of targets) {
        try {
          const emailOptions = {
            to: target.email,
            subject: "Reminder to prepare accreditation submission",
            html: target.details.map(
              (x) =>
                `<p>${x.accreditation_type} of ${x.academic_programme} is expiring on ${x.expiry_date}</p>`
            ),
          };

          await strapi.plugins["email"].services.email.send(emailOptions);
        } catch (error) {
          strapi.log.error(`Failed to send email to ${target.email}`, error);
        }
      }
    },
    options: {
      rule: "*/1 * * * *",
    },
  },
};
