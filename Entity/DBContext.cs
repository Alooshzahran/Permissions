using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Entity
{
    public class DBContext : DbContext
    {
        public DBContext() { }
        public DBContext(DbContextOptions options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            //var ConnectionString = @"Data Source=.;Initial Catalog=Permission;user id=sa;password=abc_123;MultipleActiveResultSets=true;Trusted_Connection=True;TrustServerCertificate=true;"; //Wael
            //optionsBuilder.UseSqlServer(ConnectionString);

            var ConnectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=Permission;user id=sa;password=Abcd@1234;MultipleActiveResultSets=true;Trusted_Connection=True;TrustServerCertificate=true;"; //Alaa
            optionsBuilder.UseSqlServer(ConnectionString);

        }

        public DbSet<User> User { get; set; }
        public DbSet<Module> Module { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<ModuleProperties> ModuleProperties { get; set; }
        public DbSet<UserModulePermission> UserModulePermission { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany<UserRole>(e => e.UserRoles)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserID)
                .HasConstraintName("FK_User_UserRole")
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Module>()
                .HasMany<UserRole>(e => e.UserRoles)
                .WithOne(e => e.Module)
                .HasForeignKey(e => e.ModuleID)
                .HasConstraintName("FK_Module_UserRole")
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Role>()
                .HasMany<UserRole>(e => e.UserRoles)
                .WithOne(e => e.Role)
                .HasForeignKey(e => e.RoleID)
                .HasConstraintName("FK_Role_UserRole")
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Module>()
                .HasMany<ModuleProperties>(e => e.ModuleProperties)
                .WithOne(e => e.Module)
                .HasForeignKey(e => e.ModuleID)
                .HasConstraintName("FK_Module_Module_Properties")
                .OnDelete(DeleteBehavior.NoAction);
            /*******************    omar     ******************/

            modelBuilder.Entity<Module>()
                 .HasMany<UserModulePermission>(e => e.UserModulePermission)
                 .WithOne(e => e.Module)
                 .HasForeignKey(e => e.ModuleID)
                 .HasConstraintName("FK_Module_UserModulePermission")
                 .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany<UserModulePermission>(e => e.UserModulePermission)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserID)
                .HasConstraintName("FK_User_UserModulePermission")
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Role>()
                .HasMany<UserModulePermission>(e => e.UserModulePermission)
                .WithOne(e => e.Role)
                .HasForeignKey(e => e.RoleID)
                .HasConstraintName("FK_Role_UserModulePermission")
                .OnDelete(DeleteBehavior.NoAction);






            /*************************************/
            //modelBuilder.Entity<ModuleProperties>()
            //    .HasMany<ModuleProperties_Role>(e => e.ModuleProperties_Role)
            //    .WithOne(e => e.ModuleProperties)
            //    .HasForeignKey(e => e.ModulePropertiesID)
            //    .HasConstraintName("FK_ModuleProperties_ModuleProperties_Role")
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Role>()
            //    .HasMany<ModuleProperties_Role>(e => e.ModuleProperties_Role)
            //    .WithOne(e => e.Role)
            //    .HasForeignKey(e => e.RoleID)
            //    .HasConstraintName("FK_Role_ModuleProperties_Role")
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<ModuleProperties>()
            //    .HasMany<Role>(e => e.Role)
            //    .WithMany(e => e.ModuleProperties);


            modelBuilder.Entity<User>().HasData(

                new User
                {
                    ID = 1,
                    CreationDate = DateTime.UtcNow,
                    CreationUserID = 1,
                    ModifyingDate = null,
                    ModifyingUserID = null,
                    DeleteDate = null,
                    DeleteUserID = null,
                    IsActive = true,
                    IsDeleted = false,
                    Name = "Admin",
                    Email = "info@adaaapps.com"
                }

            );


            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    ID = 1,
                    Name="Admin",
                    CreationDate = DateTime.Now,
                    CreationUserID = 1,
                    DeleteDate = null,
                    DeleteUserID = null,
                    ModifyingDate = null,
                    ModifyingUserID = null,
                    IsDeleted = false,
                    UserRoles = null
                },
                new Role
                {
                    ID = 2,
                    Name = "Creator",
                    CreationDate = DateTime.Now,
                    CreationUserID = 1,
                    DeleteDate = null,
                    DeleteUserID = null,
                    ModifyingDate = null,
                    ModifyingUserID = null,
                    IsDeleted = false,
                    UserRoles = null
                },
                new Role
                {
                    ID = 3,
                    Name = "Editor",
                    CreationDate = DateTime.Now,
                    CreationUserID = 1,
                    DeleteDate = null,
                    DeleteUserID = null,
                    ModifyingDate = null,
                    ModifyingUserID = null,
                    IsDeleted = false,
                    UserRoles = null
                },
                new Role
                {
                    ID = 4,
                    Name = "Viewer",
                    CreationDate = DateTime.Now,
                    CreationUserID = 1,
                    DeleteDate = null,
                    DeleteUserID = null,
                    ModifyingDate = null,
                    ModifyingUserID = null,
                    IsDeleted = false,
                    UserRoles = null
                }
            );
        }

    }
}
